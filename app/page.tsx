'use client'
import { useState, useEffect, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine } from 'recharts'
import { TIER_CONFIG, GAP_INDICATORS } from '@/lib/data'

interface Country { code:string; name:string; region:string; giniCoefficient:number; gaps:Record<string,number>; inequalityIndex:number; tier:keyof typeof TIER_CONFIG; population:number }

function Tip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return <div style={{ background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:6, padding:'10px 14px', fontSize:11 }}>
    <div style={{ color:'var(--ink-dim)', marginBottom:6 }}>{label}</div>
    {payload.map((p:any)=><div key={p.name} style={{ display:'flex', justifyContent:'space-between', gap:16 }}><span style={{ color:p.color||'var(--red)' }}>{p.name}</span><span style={{ color:'var(--ink)', fontWeight:500 }}>{Number(p.value).toFixed(1)}</span></div>)}
  </div>
}

export default function Home() {
  const [data, setData] = useState<Country[]>([])
  const [sel, setSel] = useState<string|null>('BG')
  const [indicator, setIndicator] = useState('lifeExpectancyGap')
  const [euAvgLE, setEuAvgLE] = useState(0)
  const [euAvgGini, setEuAvgGini] = useState(0)

  useEffect(() => {
    fetch('/api/inequality').then(r=>r.json()).then(j=>{ setData(j.data); setEuAvgLE(j.euAvgLE); setEuAvgGini(j.euAvgGini) })
  }, [])

  const selected = data.find(d=>d.code===sel)
  const severeCount = data.filter(d=>d.tier==='SEVERE_INEQUALITY').length
  const indConfig = GAP_INDICATORS.find(i=>i.key===indicator)!
  const barData = [...data].sort((a,b) => b.gaps[indicator] - a.gaps[indicator]).map(d => ({ name:d.code, value:d.gaps[indicator], tier:d.tier }))
  const scatterData = data.map(d => ({ name:d.name, code:d.code, gini:d.giniCoefficient, le:d.gaps.lifeExpectancyGap, tier:d.tier }))

  if (!data.length) return <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', color:'var(--ink-dim)', fontFamily:'Epilogue' }}>Loading inequality data...</div>

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <header style={{ background:'var(--surface)', borderBottom:'2px solid var(--ink)', padding:'20px 32px' }}>
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div className="lbl" style={{ marginBottom:8 }}>EU-SILC · OECD · WHO EURO · {data.length} COUNTRIES · 2022</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
            <div>
              <h1 className="font-serif" style={{ fontSize:'clamp(22px,3.5vw,40px)', fontWeight:700, lineHeight:1.1 }}>
                Health Inequality<br/><span style={{ color:'var(--red)' }}>by Socioeconomic Strata</span>
              </h1>
              <p style={{ fontSize:13, color:'var(--ink-mid)', marginTop:8, maxWidth:480, lineHeight:1.6 }}>
                Measuring the gap in health outcomes, access, and behaviours between the richest and poorest income quintiles across European health systems.
              </p>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
              {[{l:'Severe Inequality',v:severeCount,c:'var(--red)'},{l:'EU Avg LE Gap',v:euAvgLE+' yrs',c:'var(--amber)'},{l:'EU Avg Gini',v:euAvgGini,c:'var(--blue)'}].map(s=>(
                <div key={s.l} className="card" style={{ padding:'12px 16px' }}>
                  <div className="lbl" style={{ marginBottom:4 }}>{s.l}</div>
                  <div className="font-serif" style={{ fontSize:26, fontWeight:700, color:s.c, lineHeight:1 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth:1400, margin:'0 auto', padding:'24px 32px', display:'flex', flexDirection:'column', gap:20 }}>
        {/* Indicator selector */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {GAP_INDICATORS.map(ind=>(
            <button key={ind.key} onClick={()=>setIndicator(ind.key)} style={{ fontSize:12, fontWeight:500, padding:'6px 14px', borderRadius:4, cursor:'pointer', border:`1px solid ${indicator===ind.key?'var(--red)':'var(--border2)'}`, background:indicator===ind.key?'#fff0e8':'transparent', color:indicator===ind.key?'var(--red)':'var(--ink-mid)' }}>{ind.label}</button>
          ))}
          <div style={{ marginLeft:'auto', display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
            {Object.entries(TIER_CONFIG).map(([k,v])=>(
              <div key={k} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <span style={{ width:8,height:8,borderRadius:2,background:v.color,display:'inline-block' }}/>
                <span style={{ fontSize:9, color:'var(--ink-dim)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{v.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:sel?'1fr 340px':'1fr', gap:20, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Bar chart */}
            <div className="card animate-in" style={{ padding:20 }}>
              <div className="lbl" style={{ marginBottom:12 }}>{indConfig.label} — Richest vs Poorest Quintile Gap</div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData} margin={{ left:-10, right:10 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--border)" vertical={false}/>
                  <XAxis dataKey="name" tick={{ fill:'var(--ink-dim)', fontSize:9 }}/>
                  <YAxis tick={{ fill:'var(--ink-dim)', fontSize:9 }}/>
                  <Tooltip content={<Tip/>}/>
                  <Bar dataKey="value" name={indConfig.label} radius={[3,3,0,0]}>
                    {barData.map((d,i)=><Cell key={i} fill={TIER_CONFIG[d.tier as keyof typeof TIER_CONFIG].color} opacity={0.85}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Gini vs LE gap scatter */}
            <div className="card animate-in" style={{ padding:20 }}>
              <div className="lbl" style={{ marginBottom:6 }}>Income Inequality (Gini) vs Life Expectancy Gap</div>
              <p style={{ fontSize:11, color:'var(--ink-mid)', marginBottom:14 }}>Higher Gini = more income inequality. LE gap = years of life lost by poorest vs richest quintile.</p>
              <ResponsiveContainer width="100%" height={260}>
                <ScatterChart margin={{ top:10, right:20, bottom:20, left:-10 }}>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--border)"/>
                  <XAxis dataKey="gini" name="Gini Coefficient" type="number" tick={{ fill:'var(--ink-dim)', fontSize:9 }} label={{ value:'Gini Coefficient', position:'insideBottom', offset:-10, fill:'var(--ink-dim)', fontSize:10 }}/>
                  <YAxis dataKey="le" name="LE Gap (years)" type="number" tick={{ fill:'var(--ink-dim)', fontSize:9 }} label={{ value:'Life Expectancy Gap (yrs)', angle:-90, position:'insideLeft', fill:'var(--ink-dim)', fontSize:10 }}/>
                  <Tooltip cursor={{ strokeDasharray:'3 3' }} content={({active,payload})=>{
                    if(!active||!payload?.length) return null
                    const d=payload[0].payload
                    return <div style={{ background:'var(--surface)', border:'1px solid var(--border2)', borderRadius:6, padding:'10px 14px', fontSize:11 }}>
                      <div style={{ fontWeight:700, marginBottom:4 }}>{d.name}</div>
                      <div style={{ color:'var(--blue)' }}>Gini: {d.gini}</div>
                      <div style={{ color:'var(--red)' }}>LE gap: {d.le} yrs</div>
                    </div>
                  }}/>
                  <ReferenceLine x={euAvgGini} stroke="var(--blue)" strokeDasharray="4 3"/>
                  <ReferenceLine y={euAvgLE} stroke="var(--red)" strokeDasharray="4 3"/>
                  <Scatter data={scatterData} onClick={(d:any)=>setSel(d.code)}>
                    {scatterData.map((d,i)=><Cell key={i} fill={TIER_CONFIG[d.tier as keyof typeof TIER_CONFIG].color} opacity={0.85} r={7}/>)}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {sel && selected && (
            <div className="card animate-in" style={{ padding:22 }}>
              <div style={{ borderBottom:'1px solid var(--border)', paddingBottom:14, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <div className="lbl" style={{ marginBottom:4 }}>{selected.region}</div>
                  <h2 className="font-serif" style={{ fontSize:22, fontWeight:700 }}>{selected.name}</h2>
                  <span className="badge" style={{ color:TIER_CONFIG[selected.tier].color, borderColor:TIER_CONFIG[selected.tier].color+'44', marginTop:6, display:'inline-block' }}>{TIER_CONFIG[selected.tier].label}</span>
                </div>
                <button onClick={()=>setSel(null)} style={{ fontSize:20, color:'var(--ink-dim)', background:'none', border:'none', cursor:'pointer' }}>×</button>
              </div>

              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16, paddingBottom:12, borderBottom:'1px solid var(--border)' }}>
                <div><div className="lbl" style={{ marginBottom:2 }}>Inequality Index</div><div className="font-serif" style={{ fontSize:36, fontWeight:700, color:TIER_CONFIG[selected.tier].color }}>{selected.inequalityIndex}</div><div className="lbl">/ 100</div></div>
                <div><div className="lbl" style={{ marginBottom:2 }}>Gini Coefficient</div><div className="font-serif" style={{ fontSize:28, fontWeight:700, color:'var(--blue)' }}>{selected.giniCoefficient}</div></div>
              </div>

              <div className="lbl" style={{ marginBottom:12 }}>Health Outcome Gaps — Poorest vs Richest Quintile</div>
              {GAP_INDICATORS.map(ind=>{
                const val = selected.gaps[ind.key]
                const euAvg = data.reduce((s,c)=>s+c.gaps[ind.key],0)/(data.length||1)
                const worse = val > euAvg
                return (
                  <div key={ind.key} style={{ marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}>
                      <span style={{ fontSize:10, color:'var(--ink-mid)' }}>{ind.label}</span>
                      <span style={{ fontSize:11, fontWeight:600, color:worse?'var(--red)':'var(--green)' }}>{val.toFixed(1)} {ind.unit}</span>
                    </div>
                    <div style={{ height:5, background:'var(--border)', borderRadius:999, overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${Math.min(val/20*100,100)}%`, background:TIER_CONFIG[selected.tier].color, opacity:0.7, borderRadius:999, transition:'width 0.6s' }}/>
                    </div>
                  </div>
                )
              })}

              <div style={{ marginTop:14, padding:12, background:'var(--bg2)', borderRadius:6, border:'1px solid var(--border)' }}>
                <div className="lbl" style={{ marginBottom:6 }}>Policy Analysis</div>
                <p style={{ fontSize:11, lineHeight:1.7, color:'var(--ink-mid)' }}>
                  {selected.tier==='SEVERE_INEQUALITY' && `${selected.name} has severe health inequalities (index ${selected.inequalityIndex}/100). The ${selected.gaps.lifeExpectancyGap.toFixed(1)}-year life expectancy gap between richest and poorest quintiles, combined with ${selected.gaps.unmetNeedGap.toFixed(1)}pp unmet care need differential, indicates that socioeconomic position is a major determinant of health outcomes.`}
                  {selected.tier==='HIGH_INEQUALITY' && `${selected.name} shows high health inequality. A ${selected.gaps.lifeExpectancyGap.toFixed(1)}-year life expectancy gap and large preventive screening disparities suggest that universal coverage systems are not delivering equitable access in practice.`}
                  {selected.tier==='MODERATE' && `${selected.name} has moderate health inequality. While gaps exist across all indicators, the ${selected.gaps.lifeExpectancyGap.toFixed(1)}-year LE gap and relatively contained unmet need differential suggest functional equity mechanisms.`}
                  {selected.tier==='HIGH_EQUITY' && `${selected.name} is among Europe's most equitable health systems with a ${selected.gaps.lifeExpectancyGap.toFixed(1)}-year LE gap — well below the EU average of ${euAvgLE} years. Strong redistributive policies and near-universal care access are reflected across all gap indicators.`}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Country chips */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {data.map(c=>(
            <button key={c.code} onClick={()=>setSel(sel===c.code?null:c.code)} style={{ fontSize:9, fontWeight:500, padding:'4px 10px', borderRadius:3, border:`1px solid ${TIER_CONFIG[c.tier].color}44`, background:sel===c.code?TIER_CONFIG[c.tier].color+'18':'transparent', color:sel===c.code?TIER_CONFIG[c.tier].color:TIER_CONFIG[c.tier].color+'99', cursor:'pointer' }}>{c.code}</button>
          ))}
        </div>

        <div className="lbl" style={{ paddingTop:16, borderTop:'1px solid var(--border)', lineHeight:1.8 }}>
          Sources: Eurostat EU-SILC · OECD Health at a Glance 2023 · WHO EURO Health Equity Reports · Year: 2021–2022
        </div>
      </div>
    </div>
  )
}
