"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Battery, Camera, ChevronUp, Flashlight, Github, Globe, Home, Moon, Music2, Settings, Smartphone, Sun, Terminal, Wifi, Bluetooth, Signal, X, Bell, Volume2 } from "lucide-react";
import Wallpaper from "./Wallpaper";
import TerminalApp from "./TerminalApp";
import { DEFAULT_HOME_WALLPAPER, DEFAULT_LOCK_WALLPAPER, WallpaperId } from "@/lib/wallpapers";

type Screen = "boot" | "lock" | "home" | "widgets" | "drawer" | "terminal" | "projects" | "about" | "skills" | "experience" | "social" | "settings" | "youtube" | "github" | "music";
type Panel = "notifications" | "control" | null;

function weatherLabel(code:number){if(code===0)return "Clear sky";if([1,2,3].includes(code))return "Partly cloudy";if([45,48].includes(code))return "Fog";if([51,53,55,61,63,65,80,81,82].includes(code))return "Rain showers";if([71,73,75,85,86].includes(code))return "Snow";if([95,96,99].includes(code))return "Thunderstorm";return "Current conditions";}

export default function SystemShell() {
  const [screen,setScreen] = useState<Screen>("boot");
  const [panel,setPanel] = useState<Panel>(null);
  const [dark,setDark] = useState(true);
  const [lockWallpaper,setLockWallpaper] = useState<WallpaperId>(DEFAULT_LOCK_WALLPAPER);
  const [homeWallpaper,setHomeWallpaper] = useState<WallpaperId>(DEFAULT_HOME_WALLPAPER);
  const [customLockSrc,setCustomLockSrc] = useState<string|null>(null);
  const [customHomeSrc,setCustomHomeSrc] = useState<string|null>(null);
  const [wallpaperReady,setWallpaperReady] = useState(false);
  const [uploadMessage,setUploadMessage] = useState("");
  const [page,setPage] = useState(0);
  const [time,setTime] = useState(new Date(0));
  const [mounted,setMounted] = useState(false);
  const [toggles,setToggles] = useState({wifi:true,bluetooth:false,data:true,airplane:false});
  const [brightness,setBrightness] = useState(85);
  const [volume,setVolume] = useState(65);
  const [musicTrack,setMusicTrack] = useState(0);
  const [isPlaying,setIsPlaying] = useState(false);
  const [customSongs,setCustomSongs] = useState<Array<{name:string;url:string;key:string;coverUrl?:string}>>([]);
  const [notifications,setNotifications] = useState<Array<{id:number;title:string;message:string;time:string;target?:Screen}>>([]);
  const bundledSongs = [
    {name:"Night Changes",url:"/music/track-01.mp3",key:"bundled-1",coverUrl:"/music/artwork/track-01.webp"},
    {name:"Finding Her",url:"/music/track-02.mp3",key:"bundled-2",coverUrl:"/music/artwork/track-02.webp"},
    {name:"Dil Tu Jaan Tu",url:"/music/track-03.mp3",key:"bundled-3",coverUrl:"/music/artwork/track-03.webp"}
  ];
  const playlist = [...bundledSongs,...customSongs];
  const activeSong = playlist[musicTrack] || null;
  const [customIcons,setCustomIcons] = useState<Record<string,string>>({});
  const [customApps,setCustomApps] = useState<Array<{name:string;url:string;icon?:string}>>([]);
  const [newAppName,setNewAppName] = useState("");
  const [newAppUrl,setNewAppUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [bootDone,setBootDone] = useState(false);
  const [bootVideoSrc,setBootVideoSrc] = useState<string|null>(null);
  const [bootVideoChecked,setBootVideoChecked] = useState(true);
  const [adminAuthenticated,setAdminAuthenticated] = useState(false);
  const [adminPassword,setAdminPassword] = useState("");
  const [adminMessage,setAdminMessage] = useState("");
  const [globalSaving,setGlobalSaving] = useState(false);
  const [globalConfigLoaded,setGlobalConfigLoaded] = useState(false);
  const bootVideoRef = useRef<HTMLVideoElement>(null);
  const [discordPresence,setDiscordPresence] = useState<{state:string;details?:string;name?:string}|null>(null);
  const [weather,setWeather] = useState<{temp:number;code:number;city:string}|null>(null);
  const [weatherError,setWeatherError] = useState("Allow location for local weather");
  const [repos,setRepos] = useState<Array<{name:string;html_url:string;description:string|null;language:string|null;stargazers_count:number;fork:boolean}>>([]);
  const [repoLoading,setRepoLoading] = useState(false);
  const touchStart = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    setMounted(true); setTime(new Date());
    const timer = window.setInterval(()=>setTime(new Date()),1000);
    return ()=>{window.clearInterval(timer)};
  },[]);
  useEffect(()=>{ document.documentElement.dataset.theme = dark ? "dark" : "light"; },[dark]);
  useEffect(()=>{if(screen==="boot"&&bootVideoSrc){const v=bootVideoRef.current; if(v){v.currentTime=0;void v.play().catch(()=>{setScreen("lock");setBootDone(true)})}}},[screen,bootVideoSrc]);
  // All visitors read the same centrally published configuration from Netlify Blobs.
  useEffect(()=>{
    let alive=true;
    fetch("/.netlify/functions/profile-config",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(cfg=>{
      if(!alive||!cfg)return;
      if(typeof cfg.dark==="boolean")setDark(cfg.dark);
      if(typeof cfg.brightness==="number")setBrightness(cfg.brightness);
      if(typeof cfg.volume==="number")setVolume(cfg.volume);
      if(cfg.lockWallpaper)setLockWallpaper(cfg.lockWallpaper);
      if(cfg.homeWallpaper)setHomeWallpaper(cfg.homeWallpaper);
      if(cfg.customIcons)setCustomIcons(cfg.customIcons);
      if(Array.isArray(cfg.customApps))setCustomApps(cfg.customApps);
      if(Array.isArray(cfg.customSongs))setCustomSongs(cfg.customSongs);
      if(cfg.lockMedia)setCustomLockSrc(cfg.lockMedia);
      if(cfg.homeMedia)setCustomHomeSrc(cfg.homeMedia);
      if(cfg.bootMedia)setBootVideoSrc(cfg.bootMedia);
    }).catch(()=>{}).finally(()=>{
      if(alive) setGlobalConfigLoaded(true);
    });
    return()=>{alive=false};
  },[]);
  const publishGlobalConfig=async()=>{
    setGlobalSaving(true);setAdminMessage("");
    try{
      const r=await fetch("/.netlify/functions/profile-config",{method:"PUT",headers:{"content-type":"application/json"},credentials:"include",body:JSON.stringify({dark,brightness,volume,lockWallpaper,homeWallpaper,customIcons,customApps,customSongs,lockMedia:customLockSrc,homeMedia:customHomeSrc,bootMedia:bootVideoSrc})});
      const data=await r.json();if(!r.ok)throw new Error(data.error||"Could not publish settings");
      setAdminMessage("Published globally. Visitors will see the new settings when they load PROFILE.OS.");
    }catch(e){setAdminMessage(e instanceof Error?e.message:"Unable to publish global settings.");}
    finally{setGlobalSaving(false);}
  };
  const adminLogin=async()=>{
    setAdminMessage("");
    try{const r=await fetch("/.netlify/functions/admin-login",{method:"POST",headers:{"content-type":"application/json"},credentials:"include",body:JSON.stringify({password:adminPassword})});const data=await r.json();if(!r.ok)throw new Error(data.error||"Login failed");setAdminAuthenticated(true);setAdminPassword("");setAdminMessage("Admin session active for 8 hours.");}
    catch(e){setAdminMessage(e instanceof Error?e.message:"Admin login failed.");}
  };
  const adminLogout=async()=>{await fetch("/.netlify/functions/admin-logout",{method:"POST",credentials:"include"});setAdminAuthenticated(false);setAdminMessage("Admin session ended.");};
  useEffect(()=>{if(globalConfigLoaded&&!bootVideoSrc){const intro=window.setTimeout(()=>{setScreen("lock");setBootDone(true)},2200);return()=>window.clearTimeout(intro)}},[globalConfigLoaded,bootVideoSrc]);
  const pushNotification=(title:string,message:string,target?:Screen)=>{
    setNotifications(v=>[{id:Date.now()+Math.random(),title,message,time:new Date().toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"}),target},...v].slice(0,30));
  };
  const uploadSharedFile=async(file:File,prefix:string)=>{
    if(!adminAuthenticated)throw new Error("Sign in as admin before uploading shared media.");
    if(file.size>4*1024*1024)throw new Error("Shared uploads are limited to 4 MB per file on Netlify.");
    const data=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(",")[1]||"");reader.onerror=()=>reject(reader.error);reader.readAsDataURL(file)});
    const name=`${prefix}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g,"_")}`;
    const r=await fetch("/.netlify/functions/profile-media",{method:"POST",credentials:"include",headers:{"content-type":"application/json"},body:JSON.stringify({name,type:file.type,data})});
    const result=await r.json();if(!r.ok)throw new Error(result.error||"Media upload failed");return result.url as string;
  };
  const addSongs=async(files:FileList|null)=>{
    if(!files?.length)return;
    try{
      const added:Array<{name:string;url:string;key:string;coverUrl?:string}>=[];
      for(const file of Array.from(files)){
        if(!file.type.startsWith("audio/"))continue;
        const url=await uploadSharedFile(file,"song");
        added.push({name:file.name.replace(/\\.[^.]+$/,""),url,key:url});
      }
      if(added.length){
        const firstNewIndex=playlist.length;
        setCustomSongs(v=>[...v,...added]);
        setMusicTrack(firstNewIndex);
        setUploadMessage(`${added.length} song(s) uploaded. Publish settings to share them.`);
        pushNotification("Music library updated",`${added.length} track(s) added to your playlist.`,"music");
      }else setUploadMessage("Choose supported audio files.");
    }catch(e){setUploadMessage(e instanceof Error?e.message:"Could not upload songs.");}
  };
  const removeSong=async(key:string)=>{
    setCustomSongs(v=>v.filter(song=>song.key!==key));
    const removedIndex=playlist.findIndex(song=>song.key===key);
    if(removedIndex===musicTrack){audioRef.current?.pause();setIsPlaying(false);setMusicTrack(0);}
    else if(removedIndex>=0&&removedIndex<musicTrack)setMusicTrack(v=>Math.max(0,v-1));
    setUploadMessage("Song removed from the draft. Publish settings to apply globally.");
    pushNotification("Track removed","The track was removed from the draft playlist.","music");
  };
  const playSong=(song:{name:string;url:string;key:string;coverUrl?:string})=>{
    const index=playlist.findIndex(item=>item.key===song.key);
    if(index<0)return;
    setMusicTrack(index);
    window.setTimeout(()=>{void audioRef.current?.play().then(()=>setIsPlaying(true)).catch(()=>{});},120);
  };
  const saveSongCover=async(key:string,file:File)=>{
    if(!file.type.startsWith("image/")){setUploadMessage("Choose an image for the cover.");return;}
    try{
      const coverUrl=await uploadSharedFile(file,"cover");
      setCustomSongs(v=>v.map(song=>song.key===key?{...song,coverUrl}:song));
      setUploadMessage("Cover artwork uploaded. Publish settings to share it.");
    }catch(e){setUploadMessage(e instanceof Error?e.message:"Cover upload failed.");}
  };
  const saveAppIcon=async(app:string,file:File)=>{
    if(!file.type.startsWith("image/"))return;
    try{const url=await uploadSharedFile(file,`icon-${app.toLowerCase().replace(/[^a-z0-9]/g,"-")}`);setCustomIcons(v=>({...v,[app]:url}));setUploadMessage(`${app} icon uploaded. Publish settings to share it with visitors.`);}
    catch(e){setUploadMessage(e instanceof Error?e.message:"Icon upload failed.");}
  };
  const addWebsiteApp=()=>{
    if(!adminAuthenticated){setUploadMessage("Admin login required to add website apps.");return;}
    const name=newAppName.trim(),url=newAppUrl.trim();
    if(!name||!(url.startsWith("https://")||url.startsWith("http://"))){setUploadMessage("Enter an app name and a valid http(s) website URL.");return;}
    setCustomApps(v=>[...v,{name,url}]);setNewAppName("");setNewAppUrl("");
  };
  const launchWebsite=(url:string)=>window.open(url,"_blank","noopener,noreferrer");
  const saveCustomWallpaper=async(which:"lock"|"home",file:File)=>{
    if(!["video/mp4","video/webm"].includes(file.type)){setUploadMessage("Choose an MP4 or WebM video.");return;}
    try{const url=await uploadSharedFile(file,`${which}-wallpaper`);if(which==="lock")setCustomLockSrc(url);else setCustomHomeSrc(url);setUploadMessage(`${which} wallpaper uploaded. Publish settings to share it with everyone.`);}
    catch(e){setUploadMessage(e instanceof Error?e.message:"Wallpaper upload failed.");}
  };
  const saveBootVideo=async(file:File)=>{
    if(!["video/mp4","video/webm"].includes(file.type)){setUploadMessage("Boot video must be MP4 or WebM.");return;}
    try{const url=await uploadSharedFile(file,"boot-video");setBootVideoSrc(url);setBootVideoChecked(true);setUploadMessage("Boot video uploaded. Publish settings to share it with visitors.");}
    catch(e){setUploadMessage(e instanceof Error?e.message:"Boot video upload failed.");}
  };
  const clearBootVideo=async()=>{setBootVideoSrc(null);setUploadMessage("Boot video removed from draft. Publish settings to apply globally.");};
  const clearCustomWallpaper=async(which:"lock"|"home")=>{if(which==="lock")setCustomLockSrc(null);else setCustomHomeSrc(null);setUploadMessage("Custom wallpaper removed from draft. Publish settings to apply globally.");};

  useEffect(()=>{
    const userId="1237229822371958908";
    let alive=true;
    const load=async()=>{try{const res=await fetch(`https://api.lanyard.rest/v1/users/${userId}`);const json=await res.json();if(!alive||!json.success)return;const d=json.data;const activity=d.activities?.find((a:{type:number})=>a.type!==4);setDiscordPresence({state:d.discord_status||"offline",details:activity?.name?`${activity.name}${activity.details?` · ${activity.details}`:""}`:"No active activity",name:d.discord_user?.global_name||d.discord_user?.username||"FANGUYSS"});}catch{if(alive)setDiscordPresence({state:"unavailable",details:"Unable to reach Lanyard"});}};
    load();const timer=window.setInterval(load,30000);return()=>{alive=false;window.clearInterval(timer)};
  },[]);
  useEffect(()=>{
    let alive=true;
    const loadWeather=async()=>{
      if(!navigator.geolocation){setWeatherError("Location is not supported by this browser");return;}
      navigator.geolocation.getCurrentPosition(async pos=>{try{const {latitude,longitude}=pos.coords;const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`);const j=await r.json();if(alive){setWeather({temp:Math.round(j.current.temperature_2m),code:j.current.weather_code,city:"Your location"});setWeatherError("");}}catch{if(alive)setWeatherError("Weather is temporarily unavailable");}},()=>{if(alive)setWeatherError("Enable location to see local weather" )},{timeout:9000,maximumAge:600000});
    };
    loadWeather();return()=>{alive=false};
  },[]);
  useEffect(()=>{
    if(screen!=="projects")return;
    let alive=true;setRepoLoading(true);
    const scanRepositories=async()=>{
      const all:Array<{name:string;html_url:string;description:string|null;language:string|null;stargazers_count:number;fork:boolean}>=[];
      for(let page=1;page<=10;page++){
        const response=await fetch(`https://api.github.com/users/FANGUYSS/repos?per_page=100&page=${page}&sort=updated`);
        if(!response.ok)throw new Error("GitHub API unavailable");
        const batch=await response.json();
        if(!Array.isArray(batch))throw new Error("Unexpected GitHub response");
        all.push(...batch.filter((repo:any)=>!repo.fork));
        if(batch.length<100)break;
      }
      if(alive)setRepos(all);
    };
    scanRepositories().catch(()=>{if(alive)setRepos([])}).finally(()=>{if(alive)setRepoLoading(false)});
    return()=>{alive=false};
  },[screen]);
  useEffect(()=>{
    const key=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){ if(panel) setPanel(null); else if(screen==="drawer") setScreen("widgets"); else if(screen==="widgets") setScreen("home"); else if(screen!=="home" && screen!=="lock") setScreen("drawer"); }
      if(e.key==="ArrowUp" && screen==="lock") setScreen("home");
    };
    window.addEventListener("keydown",key); return ()=>window.removeEventListener("keydown",key);
  },[panel,screen]);

  const openApp=(app:Screen)=>{
    setScreen(app);
    pushNotification("App opened",`${app[0].toUpperCase()+app.slice(1)} is now active.`,app);
  };
  const controlMusic=(action:"play"|"pause"|"next"|"previous")=>{
    if(action==="pause"){
      audioRef.current?.pause();setIsPlaying(false);
      pushNotification("Playback paused",activeSong?.name||"Music player","music");
      return;
    }
    if(!playlist.length)return;
    if(action==="next"||action==="previous"){
      setMusicTrack(v=>(v+(action==="next"?1:playlist.length-1))%playlist.length);
    }
    window.setTimeout(()=>{
      void audioRef.current?.play().then(()=>setIsPlaying(true)).catch(()=>{
        pushNotification("Playback unavailable","The browser could not start this audio file.","music");
      });
    },120);
  };
  useEffect(()=>{if(audioRef.current){audioRef.current.volume=volume/100;}},[volume]);
  useEffect(()=>{
    const audio=audioRef.current;
    if(!audio)return;
    audio.load();
    if(isPlaying)void audio.play().catch(()=>setIsPlaying(false));
  },[musicTrack]);
  const handleTouchStart=(e:React.TouchEvent)=>{
    const target=e.target as HTMLElement;
    if(target.closest("button,a,input,textarea,select,label,[role='button'],video,audio")){touchStart.current={x:0,y:0,time:0};return;}
    const touch=e.touches[0];
    touchStart.current={x:touch.clientX,y:touch.clientY,time:Date.now()};
  };
  const handleTouchEnd=(e:React.TouchEvent)=>{
    if(!touchStart.current.time)return;
    const touch=e.changedTouches[0];
    const dx=touch.clientX-touchStart.current.x;
    const dy=touch.clientY-touchStart.current.y;
    const absX=Math.abs(dx),absY=Math.abs(dy);
    const elapsed=Date.now()-touchStart.current.time;
    touchStart.current.time=0;
    if(Math.max(absX,absY)<55||elapsed>1000||absX===absY)return;
    if(panel){
      if(absY>absX&&dy< -55){setPanel(null);return;}
      if(absY>absX&&dy>55&&touchStart.current.y<100){setPanel("notifications");return;}
      if(absX>absY&&panel==="notifications"&&dx< -65){setPanel("control");return;}
      if(absX>absY&&panel==="control"&&dx>65){setPanel("notifications");return;}
      return;
    }
    if(absY>absX){
      if(touchStart.current.y<85&&dy>65){setPanel("notifications");return;}
      if(screen==="lock"&&dy< -65){setScreen("home");return;}
      if(screen==="home"&&dy< -65){setScreen("drawer");return;}
      if(screen==="widgets"&&dy< -65){setScreen("drawer");return;}
      if(screen==="widgets"&&dy>65){setScreen("home");return;}
      if(screen==="drawer"&&dy>65){setScreen("widgets");return;}
      return;
    }
    if(screen==="home"&&dx< -65){setScreen("widgets");return;}
    if(screen==="widgets"&&dx>65){setScreen("home");return;}
    if(screen==="widgets"&&absX>65){setPage(current=>Math.max(0,Math.min(1,current+(dx<0?1:-1))));return;}
    
  };

  const activeLock = screen==="boot" || screen==="lock";
  const activeHome = ["home","widgets","drawer","terminal","projects","about","skills","experience","social","settings","youtube","github","music"].includes(screen);
  const dateText = mounted ? time.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"}) : " ";
  const timeText = mounted ? time.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit",hour12:true}).toLowerCase() : "--:--";

  return <main className="osRoot" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{filter:`brightness(${brightness/100})`}}>
    <Wallpaper id={activeLock ? lockWallpaper : homeWallpaper} active={screen!=="boot" && (activeLock || activeHome)} customSrc={activeLock ? customLockSrc : customHomeSrc} dim={screen === "lock" ? .08 : 0}/>
    <audio ref={audioRef} src={activeSong?.url} preload="metadata" onPlay={()=>setIsPlaying(true)} onPause={()=>setIsPlaying(false)} onEnded={()=>{
      if(playlist.length>1){setMusicTrack(v=>(v+1)%playlist.length);pushNotification("Now playing",playlist[(musicTrack+1)%playlist.length]?.name||"Next track","music");}
      else setIsPlaying(false);
    }} />
    <div className="grain" />
    <header className="statusBar">
      <span>{timeText}</span><span className="statusRight"><Signal size={15}/><Wifi size={15}/><Battery size={17}/></span>
    </header>
    <AnimatePresence mode="wait">
      {screen==="boot" && <motion.section key="boot" className="bootScreen" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <>{bootVideoSrc&&<video ref={bootVideoRef} className="bootVideo" src={bootVideoSrc} autoPlay muted playsInline onEnded={()=>{setScreen("lock");setBootDone(true)}}/>}{!bootVideoSrc&&<div className="bootLoader" aria-label="Starting PROFILE.OS"><span/></div>}</>
      </motion.section>}
      {screen==="lock" && <motion.section key="lock" className="lockScreen" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-30}}>
        <div className="lockTop"><span>HELLO.</span><span>PROFILE.OS</span></div>
        <div className="lockClock"><div>{timeText}</div><p>{dateText}</p></div>
        <div className="lockBottom"><div className="lockShortcuts"><button aria-label="Flashlight"><Flashlight/></button><button aria-label="Camera"><Camera/></button></div>
          <button className="unlock" onClick={()=>setScreen("home")}><ChevronUp/><span>Swipe up to unlock</span></button>
        </div>
      </motion.section>}
      {screen==="home" && <motion.section key="home" className="homeScreen emptyHome" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <div className="homeGestureHint"><span>PROFILE.OS</span><small>Swipe left for widgets</small><button className="lockAgain" onClick={()=>setScreen("lock")}>Lock device</button></div>
        <nav className="dock glassDock"><button aria-label="Open apps" onClick={()=>setScreen("drawer")}><Smartphone/></button><button aria-label="Open terminal" onClick={()=>setScreen("terminal")}><Terminal/></button><button aria-label="Open settings" onClick={()=>setScreen("settings")}><Settings/></button></nav>
      </motion.section>}
      {screen==="widgets" && <motion.section key="widgets" className="homeScreen widgetsScreen" initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-24,opacity:0}}>
        <div className="widgetsHeading"><div><small>YOUR SPACE</small><h2>Widgets</h2></div><span>{timeText}</span></div>
        <div className="widgetGrid phaseWidgets">
          <div className="widget clockWidget glassCard"><small>LOCAL TIME</small><strong>{timeText}</strong><span>{dateText}</span></div>
          <div className="widget calendarWidget glassCard"><small>CALENDAR</small><strong>{time.toLocaleDateString(undefined,{day:"numeric"})}</strong><span>{time.toLocaleDateString(undefined,{weekday:"long",month:"long"})}</span><div className="birthdayEvent"><span className="birthdayDot"/> 9 JAN · Birthday</div><div className="calendarMini">{Array.from({length:7},(_,i)=><span key={i} className={i===time.getDay()?"today":""}>{["S","M","T","W","T","F","S"][i]}</span>)}</div></div>
          <div className="widget weatherWidget glassCard"><small>WEATHER · {weather?.city||"LOCAL"}</small><strong>{weather?`${weather.temp}°`:"--°"}</strong><span>{weather?weatherLabel(weather.code):weatherError}</span><button onClick={()=>{setWeather(null);setWeatherError("Checking location…");if(navigator.geolocation)navigator.geolocation.getCurrentPosition(async pos=>{try{const r=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&current=temperature_2m,weather_code&timezone=auto`);const j=await r.json();setWeather({temp:Math.round(j.current.temperature_2m),code:j.current.weather_code,city:"Your location"});setWeatherError("");}catch{setWeatherError("Weather unavailable")}},()=>setWeatherError("Location permission denied"));}}>Refresh</button></div>
          <div className="widget discordCard glassCard"><small>DISCORD · LIVE PRESENCE</small><a href="https://discord.com/users/1237229822371958908" target="_blank" rel="noreferrer"><img src="https://lanyard.cnrad.dev/api/1237229822371958908" alt="Live Discord presence for FANGUYSS"/></a><span>{discordPresence?.details||discordPresence?.state||"Powered by Lanyard"}</span></div>
        </div>
        <div className="widgetsFooter"><span>Swipe up to open applications</span><ChevronUp size={18}/></div>
      </motion.section>}
      {screen==="drawer" && <motion.section key="drawer" className="appPage appDrawer" initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}}><div className="pageTitle">Applications <button onClick={()=>setScreen("widgets")}><X/></button></div><div className="drawerGrid">{[["Terminal","terminal"],["Projects","projects"],["About","about"],["Skills","skills"],["Experience","experience"],["Social","social"],["Music","music"],["Settings","settings"],["YouTube","youtube"],["GitHub","github"],["Instagram","social"],["Email","social"],["Browser","github"],...customApps.map(app=>[app.name,app.url] as [string,string])].map(([n,a])=><button className="appIcon" key={n} onClick={()=>{if(a.startsWith("http://")||a.startsWith("https://")){launchWebsite(a);return;}if(n==="YouTube"){window.open("https://www.youtube.com","_blank","noopener,noreferrer");return;}if(n==="GitHub"){window.open("https://github.com/FANGUYSS","_blank","noopener,noreferrer");return;}if(n==="Browser"){window.open("https://www.google.com","_blank","noopener,noreferrer");return;}if(n==="Instagram"){window.open("https://instagram.com/fanguyss","_blank","noopener,noreferrer");return;}if(n==="Email"){window.location.href="mailto:fanguyss523@gmail.com";return;}openApp(a as Screen)}}>{customIcons[n]?<img className="customAppIcon" src={customIcons[n]} alt=""/>:<span className="appGlyph">{n==="Terminal"?"›_":n==="Settings"?"⚙":n==="Music"?"♫":n==="YouTube"?"▶":n==="GitHub"?"⌘":n==="Instagram"?"◎":n==="Email"?"✉":n==="Browser"?"🌐":"✳"}</span>}{n}</button>)}</div></motion.section>}
      {["terminal","projects","about","skills","experience","social","settings","youtube","github","music"].includes(screen) && <motion.section key={screen} className="appWindow" initial={{y:35,opacity:0}} animate={{y:0,opacity:1}} exit={{y:30,opacity:0}}>
        <div className="appTitle"><button onClick={()=>setScreen("drawer")}>‹</button><strong>{screen==="terminal"?"Terminal":screen==="projects"?"Projects":screen==="about"?"About":screen==="skills"?"Skills":screen==="experience"?"Experience":screen==="social"?"Social":screen==="settings"?"Settings":screen==="music"?"Music":screen==="youtube"?"YouTube":"GitHub"}</strong><span>PROFILE.OS</span></div>
        {screen==="terminal" && <TerminalApp onHome={()=>setScreen("home")} onTheme={()=>setDark(v=>!v)} onOpenApp={(app)=>setScreen(app as Screen)} onMediaCommand={controlMusic}/>}
        {screen==="projects" && <div className="contentView projectsMinimal"><p className="eyebrow">GITHUB / PUBLIC REPOSITORIES</p><h1>Selected<br/>work<span>.</span></h1><p className="repoIntro">Live public repositories from FANGUYSS, sorted by recent activity.</p>{repoLoading?<div className="repoState">Scanning GitHub repositories…</div>:repos.length?<div className="repoGrid">{repos.map(repo=><a className="repoCard" key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer"><div className="repoCardTop"><strong>{repo.name}</strong><span>↗</span></div><p>{repo.description||"No description provided."}</p><div className="repoMeta">{repo.language&&<span>{repo.language}</span>}<span>★ {repo.stargazers_count}</span></div></a>)}</div>:<div className="repoState">GitHub repositories could not be loaded right now. <a href="https://github.com/FANGUYSS?tab=repositories" target="_blank" rel="noreferrer">Browse all repositories ↗</a></div>}<a className="projectsGithub" href="https://github.com/FANGUYSS?tab=repositories" target="_blank" rel="noreferrer">→ github.com/FANGUYSS</a></div>}
        {screen==="about" && <div className="contentView"><p className="eyebrow">ABOUT THE CREATOR</p><h1>Hey, I&apos;m<br/>FANGUYSS<span>.</span></h1><p>Independent developer crafting web products, tools and digital experiences.</p><a href="https://github.com/FANGUYSS" target="_blank" rel="noreferrer">GitHub profile ↗</a></div>}
        {screen==="skills" && <div className="contentView"><p className="eyebrow">CAPABILITIES / TOOLBOX</p><h1>What I<br/>work with<span>.</span></h1><p>Tools and technologies I use while learning, experimenting and building.</p>{["JavaScript & TypeScript","React & Next.js","Node.js & APIs","HTML, CSS & responsive UI","Discord bots & integrations","Git, GitHub & deployment","Linux, Termux & CLI workflows"].map((v,i)=><div className="listRow" key={v}><span>0{i+1}</span><strong>{v}</strong><span>↗</span></div>)}</div>}
        {screen==="experience" && <div className="contentView"><p className="eyebrow">BUILD LOG / JOURNEY</p><h1>Learning by<br/>building<span>.</span></h1><p>A project-led journey through web development, automation, communities and open-source experiments.</p>{[["CURRENT","PROFILE.OS — personal operating system portfolio"],["RECENT","Open-source experiments — bots, web apps and developer tools"],["ONGOING","Web apps, APIs, hosting and deployment experiments"],["ALWAYS","Learning, shipping, debugging and iterating"]].map(([d,v])=><div className="listRow" key={d}><span>{d}</span><strong>{v}</strong></div>)}</div>}
        {screen==="social" && <div className="contentView"><p className="eyebrow">PUBLIC CHANNELS / 01—04</p><h1>Find me<br/>online<span>.</span></h1><div className="socialTerminal"><pre>┌─ SOCIALS // PUBLIC CHANNELS ─────────┐</pre><a href="https://github.com/FANGUYSS" target="_blank" rel="noreferrer"><strong>GitHub</strong><span>github.com/FANGUYSS ↗</span></a><a href="https://youtube.com/@fanguyss" target="_blank" rel="noreferrer"><strong>YouTube</strong><span>youtube.com/@fanguyss ↗</span></a><a href="https://instagram.com/fanguyss" target="_blank" rel="noreferrer"><strong>Instagram</strong><span>instagram.com/fanguyss ↗</span></a><a href="mailto:fanguyss523@gmail.com"><strong>Email</strong><span>fanguyss523@gmail.com ↗</span></a><pre>└────────────────────────────────────┘</pre></div></div>}
        {screen==="settings" && <div className="settingsView"><p className="eyebrow">PERSONALIZE YOUR DEVICE</p><h3>Administrator</h3>{!adminAuthenticated?<div className="wallpaperGate"><p>Sign in to manage the shared PROFILE.OS experience.</p><input type="password" value={adminPassword} onChange={e=>setAdminPassword(e.target.value)} placeholder="Admin password" autoComplete="current-password"/><button onClick={()=>void adminLogin()}>Secure admin login</button><small>{adminMessage}</small></div>:<><p className="settingHint">Authenticated admin session. Changes can be published to every visitor.</p><button className="panelAction" onClick={()=>void publishGlobalConfig()} disabled={globalSaving}>{globalSaving?"Publishing…":"Publish settings to all visitors"}</button><button className="panelAction" onClick={()=>void adminLogout()}>Sign out admin</button><small>{adminMessage}</small><div className="settingRow"><div><strong>Appearance</strong><small>Adaptive dark / light theme</small></div><button className="switch" onClick={()=>setDark(v=>!v)}>{dark?"Dark":"Light"}</button></div><div className="settingRow"><div><strong>Brightness</strong><small>Interface brightness</small></div><input type="range" min="45" max="100" value={brightness} onChange={e=>setBrightness(+e.target.value)}/></div><h3>App icon studio</h3><p className="settingHint">Choose a custom image for any built-in or website app. Icons are uploaded to shared Netlify storage.</p><div className="iconStudio">{["Terminal","Projects","About","Skills","Experience","Social","Music","Settings","YouTube","GitHub","Instagram","Email","Browser",...customApps.map(a=>a.name)].map(name=><div className="iconStudioRow" key={name}><div className="iconStudioPreview">{customIcons[name]?<img src={customIcons[name]} alt=""/>:<span>{name.slice(0,1)}</span>}<strong>{name}</strong></div><label className="uploadButton">Change icon<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={e=>{const f=e.target.files?.[0];if(f)saveAppIcon(name,f);e.currentTarget.value="";}}/></label><button className="miniReset" onClick={()=>setCustomIcons(v=>{const next={...v};delete next[name];return next;})}>Reset</button></div>)}</div><h3>Website apps</h3><p className="settingHint">Add shortcuts only for websites with a real URL. They will open directly from your app drawer.</p><div className="websiteAppForm"><input value={newAppName} onChange={e=>setNewAppName(e.target.value)} placeholder="App name"/><input value={newAppUrl} onChange={e=>setNewAppUrl(e.target.value)} placeholder="https://example.com" inputMode="url"/><button onClick={addWebsiteApp}>Add website app</button></div>{customApps.map(app=><div className="settingRow" key={app.url}><div><strong>{app.name}</strong><small>{app.url}</small></div><button className="miniReset" onClick={()=>setCustomApps(v=>v.filter(x=>x.url!==app.url))}>Remove</button></div>)}<h3>Music library</h3><p className="settingHint">Add audio files and optional cover artwork. Uploaded to shared storage (4 MB per file).</p><label className="uploadButton songUpload">＋ Add songs<input type="file" accept="audio/*" multiple onChange={e=>{void addSongs(e.target.files);e.currentTarget.value="";}}/></label>{customSongs.map(song=><div className="settingRow" key={song.key}><div className="songAdminInfo">{song.coverUrl?<img className="songCoverThumb" src={song.coverUrl} alt=""/>:<span className="songCoverThumb songCoverEmpty">♫</span>}<span><strong>{song.name}</strong><small>{activeSong?.key===song.key&&isPlaying?"Now playing":"Uploaded track"}</small></span></div><label className="miniReset">Cover<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e=>{const f=e.target.files?.[0];if(f)void saveSongCover(song.key,f);e.currentTarget.value="";}}/></label><button className="miniReset" onClick={()=>playSong(song)}>Play</button><button className="miniReset" onClick={()=>void removeSong(song.key)}>Remove</button></div>)}<h3>Bundled wallpapers</h3><div className="wallpaperChoices">{[{id:"nocturne",name:"Nocturne"},{id:"aurora",name:"Aurora Drift"}].map(w=><div className="wallChoice" key={w.id}><strong>{w.name}</strong><div><button onClick={()=>{setLockWallpaper(w.id as WallpaperId);void clearCustomWallpaper("lock")}}>Set lock</button><button onClick={()=>{setHomeWallpaper(w.id as WallpaperId);void clearCustomWallpaper("home")}}>Set home</button></div></div>)}</div><h3>Personal video wallpapers</h3><p className="settingHint">Upload MP4 or WebM · up to 4 MB per file · shared with all visitors after publishing.</p><div className="wallpaperChoices"><div className="wallChoice"><strong>Lock screen video</strong><div><label className="uploadButton">Choose video<input type="file" accept="video/mp4,video/webm" onChange={e=>{const f=e.target.files?.[0];if(f)void saveCustomWallpaper("lock",f);e.currentTarget.value=""}}/></label><button onClick={()=>void clearCustomWallpaper("lock")}>Reset</button></div></div><div className="wallChoice"><strong>Home screen video</strong><div><label className="uploadButton">Choose video<input type="file" accept="video/mp4,video/webm" onChange={e=>{const f=e.target.files?.[0];if(f)void saveCustomWallpaper("home",f);e.currentTarget.value=""}}/></label><button onClick={()=>void clearCustomWallpaper("home")}>Reset</button></div></div></div><div className="wallChoice"><strong>Boot video</strong><div><label className="uploadButton">Choose video<input type="file" accept="video/mp4,video/webm" onChange={e=>{const f=e.target.files?.[0];if(f)void saveBootVideo(f);e.currentTarget.value=""}}/></label><button onClick={()=>void clearBootVideo()}>Reset</button></div></div><p className="settingHint">Your boot video plays when visitors open the site, before the lock screen. Muted autoplay is used for browser compatibility.</p><p className="uploadStatus">{uploadMessage || (wallpaperReady?"Wallpaper library ready.":"Loading saved wallpapers…")}</p></>}</div>}
        
        
        {screen==="music" && <div className="contentView"><p className="eyebrow">PERSONAL MUSIC LIBRARY</p><h1>Soundtrack<br/>your session<span>.</span></h1>{activeSong?<div className="nowPlayingCard">{activeSong.coverUrl?<img className="nowPlayingCover" src={activeSong.coverUrl} alt={`${activeSong.name} cover`}/>:<div className="nowPlayingCover coverPlaceholder">♫</div>}<div className="nowPlayingMeta"><small>{isPlaying?"NOW PLAYING":"SELECTED TRACK"}</small><strong>{activeSong.name}</strong><span>{musicTrack+1} OF {playlist.length} TRACKS</span></div></div>:<div className="emptyMusic"><span>♫</span><strong>Your library is empty.</strong><p>Open Settings to upload tracks to your shared music library.</p><button className="musicAction" onClick={()=>setScreen("settings")}>OPEN SETTINGS</button></div>}{playlist.map((song,index)=><div className={`musicTrack ${musicTrack===index?"activeMusicTrack":""}`} key={song.key}>{song.coverUrl?<img className="musicListCover" src={song.coverUrl} alt=""/>:<span className="musicListGlyph">♫</span>}<div><strong>{song.name}</strong><small>{index<3?"Included track": "Uploaded track"}{musicTrack===index?(isPlaying?" · Playing":" · Selected"):""}</small></div><button className="musicAction" onClick={()=>playSong(song)}>{musicTrack===index&&isPlaying?"PLAYING":"PLAY"}</button></div>)}<div className="musicControls"><button onClick={()=>controlMusic("previous")} disabled={!playlist.length}>PREVIOUS</button><button onClick={()=>isPlaying?controlMusic("pause"):controlMusic("play")} disabled={!playlist.length}>{isPlaying?"PAUSE":"PLAY"}</button><button onClick={()=>controlMusic("next")} disabled={!playlist.length}>NEXT</button></div></div>}
      </motion.section>}
    </AnimatePresence>
    {panel && <motion.div className="systemPanel" initial={{y:"-100%"}} animate={{y:0}} exit={{y:"-100%"}}>
      <div className="panelHeader"><span>{panel==="notifications"?"Notifications":"Control centre"}</span><button onClick={()=>setPanel(null)}><X/></button></div>
      {panel==="notifications" ? <><div className="notificationHeaderActions"><span>{notifications.length?`${notifications.length} recent notifications`:"All caught up"}</span><button onClick={()=>setNotifications([])} disabled={!notifications.length}>Clear all</button></div>{notifications.length?notifications.map(item=><button className="notification notificationButton" key={item.id} onClick={()=>{setPanel(null);if(item.target)setScreen(item.target);}}><Bell/><div><strong>{item.title}</strong><p>{item.message}</p><small>{item.time}</small></div></button>):<div className="emptyNotifications"><Bell/><strong>No new notifications</strong><p>App activity and music events will appear here.</p></div>}<button className="panelAction" onClick={()=>{setPanel(null);setScreen("music")}}>Open music</button><button className="panelAction" onClick={()=>setPanel("control")}>Quick settings →</button></> : <><div className="quickGrid">{(["wifi","bluetooth","data","airplane"] as const).map(k=><button className={toggles[k]?"quickTile on":"quickTile"} key={k} onClick={()=>setToggles(v=>({...v,[k]:!v[k]}))}>{k==="wifi"?<Wifi/>:k==="bluetooth"?<Bluetooth/>:k==="data"?<Signal/>:<Globe/>}<span>{k==="data"?"Mobile data":k[0].toUpperCase()+k.slice(1)}</span><small>{toggles[k]?"On":"Off"}</small></button>)}</div><div className="sliderRow"><Sun/><input type="range" min="45" max="100" value={brightness} onChange={e=>setBrightness(+e.target.value)}/></div><div className="sliderRow"><Volume2/><input type="range" min="0" max="100" value={volume} onChange={e=>setVolume(+e.target.value)}/></div><button className="panelAction" onClick={()=>setDark(v=>!v)}>{dark?"Switch to light mode":"Switch to dark mode"}</button><button className="panelAction" onClick={()=>setPanel("notifications")}>← Notifications</button></>}
    </motion.div>}
    <button className="edgeHandle" aria-label="Open notifications" onClick={()=>setPanel(panel?null:"notifications")}/>
    {screen!=="boot" && screen!=="lock" && <button className="homeIndicator" aria-label="Go home" onClick={()=>setScreen("home")}/>}
  </main>;
}
