import { NextResponse } from 'next/server'
import { INEQUALITY_DATA } from '@/lib/data'
export async function GET() {
  const sorted = [...INEQUALITY_DATA].sort((a, b) => b.inequalityIndex - a.inequalityIndex)
  const euAvgLE = Math.round(sorted.reduce((s,c)=>s+c.gaps.lifeExpectancyGap,0)/sorted.length*10)/10
  const euAvgGini = Math.round(sorted.reduce((s,c)=>s+c.giniCoefficient,0)/sorted.length*10)/10
  return NextResponse.json({ data: sorted, euAvgLE, euAvgGini })
}
