import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Icons from './Icons'
import NSButton  from '../components/NSButton/index';
import ActiveLeftArrow from '../components/Icons copy/activeLeftArrow'
import ActiveRightArrow from '../components/Icons copy/activeRightArrow'
import CheckboxChecked from '../components/Icons copy/checkboxChecked'
import CheckMark from '../components/Icons copy/checkMark'
import CustomCheckbox from '../components/Icons copy/customCheckbox'
import HamburgerArrow from '../components/Icons copy/hamburgerArrow'
import IntermediateCheckbox from '../components/Icons copy/intermediateCheckbox'
import Lookup from '../components/Icons copy/lookup'
import PillClose from '../components/Icons copy/pillClose'
import SmallRightArrow from '../components/Icons copy/smallRightArrow'
import SolidDownArrow from '../components/Icons copy/solidDownArrow'
import ToolTipIcon from '../components/Icons copy/toolTipIcon'
import WideRightArrow from '../components/Icons copy/wideRightArrow'

export default {
  title: 'Icons',
  component: Icons
}

export function IconsContainer() {
  return (
    <BrowserRouter> 
      <div> 
        <h3>SVG Icons</h3>
          <p><ActiveRightArrow/> Active Right Arrow </p>
          <p><ActiveLeftArrow/> Active Left Arrow </p>
          <p><CheckboxChecked/> Checkbox checked </p>
          <p><CheckMark/> Check mark </p>
          <p><CustomCheckbox/> Custom Checkbox </p>
          <p><HamburgerArrow classes={{ show: 'test' }} /> Hamburger Arrow </p>
          <p><IntermediateCheckbox/> Intermediate Checkbox </p>
          <p><NSButton version={2} > <Lookup/> </NSButton> Lookup </p>
          <p><NSButton version={2}> <PillClose/> </NSButton> Pill close </p>
          <p><SmallRightArrow/> Small right arrow </p>
          <p><NSButton version={2}> <SolidDownArrow/> </NSButton> Solid down arrow </p>
          <p><NSButton version={2}> <ToolTipIcon/> </NSButton> Tool tip icon </p>
          <p><WideRightArrow/> Wide right arrow </p>
      </div>
    </BrowserRouter>
  )
}
