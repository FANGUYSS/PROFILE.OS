"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, Terminal as TerminalIcon } from "lucide-react";

type AppTarget = "home" | "terminal" | "projects" | "about" | "skills" | "experience" | "social" | "music" | "settings" | "github";
type Entry = { command?: string; output: string; tone?: "muted" | "good" | "accent" | "warn" | "error" };
const COMMANDS = [
  "help","whoami","about","projects","skills","stack","experience","social","socials","contact","discord","github",
  "clear","home","open","visit","date","history","ls","pwd","neofetch","status","ascii","showcase","aesthetic","coffee","fortune","fortytwo",
  "konami","matrix","secret","sudo","theme","music","play","pause","resume","next","previous","nowplaying"
];
const ALIASES: Record<string,string> = { bio:"about", me:"whoami", work:"projects", exp:"experience", cv:"experience", socials:"social", lsll:"ls", now:"nowplaying", cls:"clear", q:"home" };
const SKILLS = ["JavaScript / TypeScript","React / Next.js","Node.js","HTML / CSS","Git / GitHub","Discord bot development","API integration","Linux / Termux"];

export default function TerminalApp({ onHome, onTheme, onOpenApp, onMediaCommand }: { onHome:()=>void; onTheme:()=>void; onOpenApp:(app:AppTarget)=>void; onMediaCommand:(action:"play"|"pause"|"next"|"previous")=>void }) {
  const [entries,setEntries] = useState<Entry[]>([
    {output:"  ███████╗ ██████╗ ███████╗\n  ██╔════╝██╔═══██╗██╔════╝\n  █████╗  ██║   ██║███████╗\n  ██╔══╝  ██║   ██║╚════██║\n  ██║     ╚██████╔╝███████║\n  ╚═╝      ╚═════╝ ╚══════╝",tone:"accent"},
    {output:"PROFILE.OS · interactive developer console",tone:"good"},
    {output:"A personal workspace by FANGUYSS. Type 'help' to explore.",tone:"muted"},
  ]);
  const [value,setValue] = useState("");
  const [history,setHistory] = useState<string[]>([]);
  const [historyIndex,setHistoryIndex] = useState(-1);
  const [themeIndex,setThemeIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const themes = ["Violet / Cyan","Matrix Green","Amber Terminal","Arctic Blue"];
  const paletteClass = ["term-violet","term-green","term-amber","term-blue"][themeIndex];
  useEffect(()=>{ outputRef.current?.scrollTo({top:outputRef.current.scrollHeight,behavior:"smooth"}); },[entries]);
  const suggestions = useMemo(()=>["help","neofetch","projects","skills","socials","music"],[]);

  const execute = (raw:string) => {
    const entered = raw.trim(); if(!entered) return;
    const parts = entered.split(/\s+/); let cmd = parts[0].toLowerCase(); const args = parts.slice(1); cmd = ALIASES[cmd] || cmd;
    if(cmd === "clear") { setEntries([]); setValue(""); setHistory(v=>[...v,entered]); setHistoryIndex(-1); return; }
    let output = ""; let tone:Entry["tone"] = "muted"; let action:(()=>void)|undefined;
    switch(cmd) {
      case "help": output = "PROFILE.OS COMMAND INDEX\n\nIDENTITY\n  whoami, about, experience, contact, discord\nWORK\n  projects, skills, stack, github\nSOCIAL\n  social, socials\nSYSTEM\n  help, clear, home, date, history, ls, pwd, status, neofetch\nNAVIGATION\n  open <app>, visit <url>\nMEDIA\n  music, play, pause, resume, next, previous, nowplaying\nEXTRAS\n  ascii, showcase, coffee, fortune, fortytwo, konami, matrix, secret, sudo, theme\n\nKEYBOARD  ↑ / ↓ history · Tab autocomplete · Enter run · Esc close"; tone="accent"; break;
      case "whoami": case "about": output = "FANGUYSS / INDEPENDENT BUILDER\n\n“I design software that stays out of the way.”\nI build web products, developer tools, Discord bots and experiments that make the internet more useful.\n\nCurrently focused on PROFILE.OS, open-source tools and learning by shipping."; tone="good"; break;
      case "projects": output = "GITHUB / PUBLIC REPOSITORIES\n\nThe Projects app automatically fetches public repositories from:\nhttps://github.com/FANGUYSS\n\nUse `open projects` to view repository cards, descriptions, languages and stars here in PROFILE.OS."; tone="accent"; break;
      case "skills": case "stack": output = "TOOLBOX / CURRENTLY EXPLORING\n"+SKILLS.map((s,i)=>`  ${String(i+1).padStart(2,"0")}  ${s}`).join("\n")+"\n\nLearning by shipping, breaking, and rebuilding."; break;
      case "experience": output = "BUILD LOG / LEARNING IN PUBLIC\n  NOW          PROFILE.OS — personal web operating system\n  RECENT       Web apps, Discord bots and music systems\n  TOOLING      Linux, Termux, GitHub and deployment workflows\n  ALWAYS       Learning, shipping, debugging and iterating."; break;
      case "social": case "socials": case "contact": output = "FIND ME ONLINE\n  GitHub     https://github.com/FANGUYSS\n  Website    https://fanguyss.me\n  YouTube    https://youtube.com/@fanguyss\n  Instagram  https://instagram.com/fanguyss\n  Email      fanguyss523@gmail.com\n\nFor collaboration, reach out through GitHub or email."; break;
      case "discord": output = "DISCORD PRESENCE\n  Provider: Lanyard API\n  State: Lanyard public profile 1237229822371958908\n  Live presence card is embedded on the Widgets screen."; tone="warn"; break;
      case "github": output = "GITHUB / FANGUYSS\n  https://github.com/FANGUYSS\n  Public repositories are fetched automatically in the Projects app.\n  Use `open github` to open the profile in a new tab."; tone="accent"; break;
      case "date": output = new Date().toString(); tone="good"; break;
      case "pwd": output = "/home/fanguyss"; break;
      case "ls": output = "about.md  projects/  skills/  experience.log  socials/  music/  README.md"; break;
      case "status": output = "PROFILE.OS  [ ONLINE ]\n  Kernel       profile-os-web\n  Session      visitor\n  Interface    adaptive / responsive\n  Network      browser-managed\n  Presence     Lanyard not configured\n  Audio        local playlist ready for tracks"; tone="good"; break;
      case "neofetch": output = "        .--.          fanguyss@profile-os\n       |o_o |         --------------------\n       |:_/ |         OS: PROFILE.OS\n      //   \\ \\        Host: Web Runtime\n     (|     | )       Shell: profile-sh\n    /'\\_   _/`\\       Theme: "+themes[themeIndex]+"\n    \\___)=(___/       Stack: Next.js · React · TypeScript\n                      Mood: building something useful"; tone="accent"; break;
      case "history": output = history.length ? history.map((h,i)=>`  ${String(i+1).padStart(2,"0")}  ${h}`).join("\n") : "No commands in this session yet."; break;
      case "open": case "visit": {
        const target=(args[0]||"").toLowerCase();
        const map:Record<string,AppTarget>={home:"home",projects:"projects",about:"about",skills:"skills",experience:"experience",social:"social",music:"music",settings:"settings",github:"github",terminal:"terminal"};
        if(map[target]) { output=`Opening ${target}…`; action=()=>target==="home"?onHome():onOpenApp(map[target]); tone="good"; }
        else if(target.startsWith("http")) { output=`External link: ${target}`; action=()=>window.open(target,"_blank","noopener,noreferrer"); }
        else output="Usage: open <home|projects|about|skills|experience|social|music|settings|github>";
        break;
      }
      case "home": output="Returning to home screen…"; action=onHome; tone="good"; break;
      case "music": case "play": case "resume": setPlaying(true); onMediaCommand("play"); output="Opening your music library. Choose a track to start playback."; tone="good"; action=()=>onOpenApp("music"); break;
      case "pause": setPlaying(false); onMediaCommand("pause"); output="Playback paused."; break;
      case "next": onMediaCommand("next"); output="Skipping to the next playlist track."; break;
      case "previous": onMediaCommand("previous"); output="Returning to the previous playlist track."; break;
      case "nowplaying": output=`${playing?"▶ PLAY REQUESTED":"Ⅱ PLAYER"}\nOpen the Music app to view the current track and playback controls.`; break;
      case "theme": setThemeIndex(v=>(v+1)%themes.length); output=`Terminal theme → ${themes[(themeIndex+1)%themes.length]}`; tone="good"; break;
      case "showcase": case "aesthetic": output=`PROFILE.OS VISUAL SYSTEM\n  01  NOCTURNE     deep ink · violet glow · soft grain\n  02  AURORA       warm haze · sea glass · atmospheric motion\n  03  TERMINAL     mono typography · phosphor accents\n  04  MOTION       spring transitions · gesture navigation\n  Type theme to cycle terminal palettes.`; tone="accent"; break;
      case "ascii": output="     /\\_/\\\n    ( o.o )\n     > ^ <\n  just a curious cat in your terminal"; tone="accent"; break;
      case "coffee": output="   ( (\n    ) )\n  ........\n  |      |]  One coffee. Infinite side quests.\n  \\______/"; tone="good"; break;
      case "fortune": output=["Make it work. Make it clear. Make it delightful.","The best feature is the one that solves a real problem.","Every expert was once a beginner who kept shipping."][Math.floor(Math.random()*3)]; tone="accent"; break;
      case "fortytwo": output="42 — the answer is easy. Asking the right question is the hard part."; break;
      case "konami": output="↑ ↑ ↓ ↓ ← → ← → B A  //  secret sequence acknowledged."; tone="good"; break;
      case "matrix": output="Wake up, developer…\nThe terminal has you.\nFollow the white rabbit. 🐇"; tone="good"; break;
      case "secret": output="You found the quiet corner. Keep creating things worth sharing."; tone="accent"; break;
      case "sudo": output="Nice try 😄\nThis is a portfolio shell, not a privileged system."; tone="warn"; break;
      default: output=`command not found: ${cmd}\nType 'help' to see available commands.`; tone="error";
    }
    setEntries(v=>[...v,{command:entered,output,tone}]); setHistory(v=>[...v,entered]); setHistoryIndex(-1); setValue(""); action?.();
  };
  const onKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){execute(value);return;}
    if(e.key==="ArrowUp"){e.preventDefault(); if(history.length){const i=historyIndex<0?history.length-1:Math.max(0,historyIndex-1);setHistoryIndex(i);setValue(history[i]);}}
    if(e.key==="ArrowDown"){e.preventDefault(); if(historyIndex>=0){const i=historyIndex+1;if(i>=history.length){setHistoryIndex(-1);setValue("");}else{setHistoryIndex(i);setValue(history[i]);}}}
    if(e.key==="Tab"){e.preventDefault();const q=value.toLowerCase();const matches=COMMANDS.filter(c=>c.startsWith(q));if(matches.length===1)setValue(matches[0]);else if(matches.length>1)setEntries(v=>[...v,{command:value,output:matches.join("   "),tone:"accent"}]);}
    if(e.key==="Escape") inputRef.current?.blur();
  };
  return <div className={`terminalApp ${paletteClass}`} onClick={()=>inputRef.current?.focus()}>
    <div className="terminalToolbar"><div className="terminalLights"><i/><i/><i/></div><span><TerminalIcon size={13}/> FANGUYSS — INTERACTIVE SHELL</span><small>v1.0.0</small></div>
    <div className="terminalMeta"><span>SESSION: GUEST</span><span>UTF-8 · {themes[themeIndex].toUpperCase()}</span></div>
    <div className="terminalOutput" ref={outputRef}>
      {entries.map((entry,i)=><div className="terminalEntry" key={i}>
        {entry.command && <div className="terminalCommand"><b>fanguyss@profile-os</b><span>:</span><em>~</em><span>$</span> {entry.command}</div>}
        <pre className={`terminalResult ${entry.tone||""}`}>{entry.output}</pre>
      </div>)}
      <div className="terminalInputLine"><b>fanguyss@profile-os</b><span>:</span><em>~</em><span>$</span><input ref={inputRef} value={value} onChange={e=>setValue(e.target.value)} onKeyDown={onKeyDown} placeholder="type a command…" autoCapitalize="none" autoComplete="off" spellCheck={false}/><i className="terminalCursor"/></div>
    </div>
    <div className="terminalSuggestions">{suggestions.map(s=><button key={s} onClick={()=>execute(s)}>{s}<ChevronRight size={11}/></button>)}</div>
    <div className="terminalFooter"><span>↑↓ HISTORY</span><span>TAB AUTOCOMPLETE</span><button onClick={onTheme}>SYSTEM THEME <ArrowUpRight size={11}/></button></div>
  </div>;
}
