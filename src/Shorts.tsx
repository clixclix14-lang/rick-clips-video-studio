import React from 'react';
import {Audio, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';

export type ShortsProps = {audioSrc: string | null};

const scenes = [
  {title: 'A tiny idea', subtitle: 'One tiny idea can change your whole day.', sky: ['#ffb36b', '#f36b6b'], ground: '#8a4562', place: 'hill'},
  {title: 'The big leap', subtitle: 'Milo was small. His curiosity was not.', sky: ['#85d5ff', '#5471bd'], ground: '#42628c', place: 'city'},
  {title: 'Into the unknown', subtitle: 'So he built a rocket from old boxes.', sky: ['#271c58', '#8e4f9d'], ground: '#302c67', place: 'space'},
  {title: 'A brighter view', subtitle: 'Every little step brought a brighter view.', sky: ['#ff8b79', '#ffc773'], ground: '#985268', place: 'clouds'},
  {title: 'Your turn', subtitle: 'Start where you are. Make something wonderful.', sky: ['#78d8c6', '#61a4c4'], ground: '#477d79', place: 'garden'},
] as const;
const SCENE_FRAMES = 180;

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Character: React.FC<{frame: number; sceneIndex: number}> = ({frame, sceneIndex}) => {
  const bob = Math.sin(frame / 10) * 13;
  const lean = sceneIndex === 2 ? -7 : sceneIndex === 1 ? 5 : 0;
  const x = interpolate(frame, [0, 899], [0, 28], clamp);
  return (
    <div style={{position: 'absolute', width: 390, height: 600, left: `calc(50% - 195px + ${x}px)`, bottom: 245 + bob, transform: `rotate(${lean}deg)`, filter: 'drop-shadow(0 28px 18px rgba(20,18,44,.3))'}}>
      <svg viewBox="0 0 260 400" width="100%" height="100%" role="img" aria-label="Milo the cartoon explorer">
        <ellipse cx="130" cy="374" rx="77" ry="15" fill="rgba(18,24,46,.24)" />
        <path d="M72 244 Q130 215 188 244 L207 334 Q130 365 53 334Z" fill="#ffcb58" stroke="#392d56" strokeWidth="9" strokeLinejoin="round" />
        <path d="M80 267 L40 307 M180 267 L219 300" fill="none" stroke="#392d56" strokeWidth="18" strokeLinecap="round" />
        <path d="M98 330 L91 365 M164 330 L172 365" fill="none" stroke="#392d56" strokeWidth="20" strokeLinecap="round" />
        <path d="M71 365 L107 365 M156 365 L190 365" fill="none" stroke="#ef6b61" strokeWidth="19" strokeLinecap="round" />
        <path d="M72 94 Q130 39 188 94 L203 174 Q192 244 130 252 Q68 244 57 174Z" fill="#ffc79e" stroke="#392d56" strokeWidth="9" strokeLinejoin="round" />
        <path d="M66 113 Q62 56 119 45 Q176 33 197 82 L186 107 Q149 82 110 101 L81 126Z" fill="#55426e" stroke="#392d56" strokeWidth="9" strokeLinejoin="round" />
        <path d="M83 171 Q99 157 114 171 M145 171 Q161 157 177 171" fill="none" stroke="#392d56" strokeWidth="8" strokeLinecap="round" />
        <circle cx="99" cy="177" r="5" fill="#392d56"/><circle cx="161" cy="177" r="5" fill="#392d56" />
        <path d="M112 204 Q130 222 150 202" fill="none" stroke="#cf5f58" strokeWidth="7" strokeLinecap="round" />
        <path d="M76 126 Q46 119 50 155 Q54 180 72 178 M185 126 Q215 119 211 155 Q207 180 189 178" fill="#ffc79e" stroke="#392d56" strokeWidth="8" />
        <path d="M95 250 L130 273 L165 250" fill="#7acbd0" stroke="#392d56" strokeWidth="7" strokeLinejoin="round" />
        <path d="M38 303 Q25 310 37 322 Q48 331 58 319 M219 297 Q237 296 237 309 Q237 322 220 322" fill="#ffc79e" stroke="#392d56" strokeWidth="8" />
        <path d="M89 87 Q132 61 174 86" fill="none" stroke="#ffdf78" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </div>
  );
};

const Landscape: React.FC<{place: string; frame: number}> = ({place, frame}) => {
  const drift = interpolate(frame, [0, SCENE_FRAMES], [0, -70], { ...clamp, easing: Easing.inOut(Easing.quad) });
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: '-3%', transform: `translateX(${drift}px) scale(1.08)`, background: 'radial-gradient(ellipse at 50% 32%, rgba(255,255,255,.62), transparent 28%)'}} />
      {place === 'hill' && <><div style={{position:'absolute', width:900,height:520,borderRadius:'50%',background:'#d78970',left:-250,bottom:390,transform:'rotate(-10deg)'}}/><div style={{position:'absolute',width:1000,height:480,borderRadius:'50%',background:'#a95570',right:-300,bottom:260,transform:'rotate(12deg)'}}/><div style={{position:'absolute',width:700,height:260,borderRadius:'50%',background:'#6d476d',left:220,bottom:130}}/></>}
      {place === 'city' && <>{[0,1,2,3,4,5,6].map((i)=><div key={i} style={{position:'absolute',width:125,height:430+(i%3)*120,bottom:220,left: i*165-40,background:i%2?'#344d83':'#3e5891',borderRadius:'14px 14px 0 0',boxShadow:'inset 8px 0 rgba(255,255,255,.08)'}}>{Array.from({length:8},(_,j)=><i key={j} style={{display:'inline-block',width:17,height:24,margin:'12px 10px',background:'#ffd985',opacity:.8}} />)}</div>)}<div style={{position:'absolute',left:-200,right:-200,bottom:180,height:100,background:'#344469',transform:'perspective(400px) rotateX(18deg)'}}/></>}
      {place === 'space' && <><div style={{position:'absolute',width:430,height:430,borderRadius:'50%',right:-100,top:370,background:'radial-gradient(circle at 30% 28%,#ffd1ed,#d16fc5 46%,#724bb0 72%,#362c77)',boxShadow:'0 0 100px rgba(239,128,255,.45)'}}/>{Array.from({length:35},(_,i)=><span key={i} style={{position:'absolute',left:`${(i*73)%100}%`,top:`${(i*137)%76}%`,width:i%5===0?8:4,height:i%5===0?8:4,borderRadius:'50%',background:'#fff4cb',opacity:.5+(i%5)/10}} />)}<div style={{position:'absolute',left:80,top:370,width:160,height:380,borderRadius:'45%',background:'linear-gradient(90deg,#ffdf81,#fb835c)',transform:'rotate(26deg)',boxShadow:'0 0 80px #ffae67'}}/></>}
      {place === 'clouds' && <>{[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',width:450,height:130,borderRadius:100,left:i*230-200,bottom:150+(i%2)*115,background:'rgba(255,244,232,.55)',filter:'blur(5px)'}}/>)}<div style={{position:'absolute',right:60,top:460,width:230,height:230,borderRadius:'50%',background:'radial-gradient(circle at 35% 35%,#fff5b0,#ffbd75 65%,#f39286)',boxShadow:'0 0 100px rgba(255,234,167,.5)'}}/></>}
      {place === 'garden' && <>{Array.from({length:8},(_,i)=><div key={i} style={{position:'absolute',bottom:210,left:i*165-60,width:90,height:270,background:'#3c816f',borderRadius:'70% 20% 60% 20%',transform:`rotate(${i%2?25:-25}deg)`}}/>)}<div style={{position:'absolute',left:-100,right:-100,bottom:150,height:150,background:'#72a873',borderRadius:'50%'}}/>{[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',left:120+i*190,bottom:340+(i%2)*70,fontSize:70,color:'#ffe37a'}}>✿</div>)}</>}
    </div>
  );
};

const Subtitle: React.FC<{text: string; frame: number}> = ({text, frame}) => {
  const entrance = interpolate(frame, [0, 12], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.4))});
  return <div style={{position:'absolute',left:76,right:76,bottom:98,textAlign:'center',transform:`translateY(${(1-entrance)*24}px) scale(${0.96+entrance*.04})`,opacity:entrance}}><span style={{display:'inline-block',padding:'22px 30px',borderRadius:28,background:'rgba(22,24,50,.78)',border:'2px solid rgba(255,255,255,.22)',color:'#fff',fontFamily:'Arial, sans-serif',fontSize:47,fontWeight:800,lineHeight:1.16,textShadow:'0 3px 4px rgba(0,0,0,.25)'}}>{text}</span></div>;
};

export const Shorts: React.FC<ShortsProps> = ({audioSrc}) => {
  const frame = useCurrentFrame();
  const sceneIndex = Math.min(scenes.length - 1, Math.floor(frame / SCENE_FRAMES));
  const localFrame = frame - sceneIndex * SCENE_FRAMES;
  const scene = scenes[sceneIndex];
  const fadeIn = interpolate(localFrame, [0, 16], [0, 1], clamp);
  const fadeOut = interpolate(localFrame, [SCENE_FRAMES - 16, SCENE_FRAMES], [1, 0], clamp);
  const fade = Math.min(fadeIn, fadeOut);
  const titleOpacity = interpolate(localFrame, [8, 24, 126, 150], [0, 1, 1, 0], clamp);
  return (
    <div style={{flex:1,background:`linear-gradient(180deg,${scene.sky[0]},${scene.sky[1]} 72%,${scene.ground})`,fontFamily:'Arial, sans-serif',overflow:'hidden',position:'relative'}}>
      {audioSrc ? <Audio src={audioSrc.startsWith('http') ? audioSrc : staticFile(audioSrc)} /> : null}
      <Landscape place={scene.place} frame={localFrame}/>
      <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(16,18,42,.16),transparent 25%,transparent 65%,rgba(16,18,42,.34))'}}/>
      <div style={{position:'absolute',top:150,left:0,right:0,textAlign:'center',opacity:titleOpacity,color:'white',fontSize:30,fontWeight:800,letterSpacing:8,textTransform:'uppercase',textShadow:'0 3px 14px rgba(0,0,0,.3)'}}>{scene.title}</div>
      <Character frame={frame} sceneIndex={sceneIndex}/>
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:28,background:'rgba(255,255,255,.16)'}}><div style={{height:'100%',width:`${(frame/899)*100}%`,background:'#ffe27a'}}/></div>
      <div style={{position:'absolute',inset:0,background:'#17142f',opacity:1-fade,pointerEvents:'none'}}/>
      <Subtitle text={scene.subtitle} frame={localFrame}/>
      <div style={{position:'absolute',right:42,top:80,color:'rgba(255,255,255,.8)',fontSize:22,fontWeight:700}}>MILO • 00:{String(Math.floor(frame/30)).padStart(2,'0')}</div>
    </div>
  );
};
