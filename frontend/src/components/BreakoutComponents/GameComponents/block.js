import React from 'react'
import { getRange } from './Utils/utils'
import { BLOCK_MAX_DENSITY } from '../GameCore/levels'

const colors = getRange(BLOCK_MAX_DENSITY).map(i => `rgba(255, 42, 109, ${1 / (BLOCK_MAX_DENSITY - i)})`)

export default ({ x, y, width, height, density }) => (
    <rect className='block' fill={colors[density]} x={x} y={y} width={width} height={height} />
)