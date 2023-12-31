import React, { Component } from 'react'
import classNames from 'classnames'

import Separator from './Separator'

export default class ToolbarItem extends Component {

  static toggleAction(action) {
    if (action.toggle) {
      action.toggle(!action.active)
    }
  }

  render() {
    const Icon = this.props.item.icon

    if (this.props.item.type === 'separator') {
      return <Separator />
    }

    const className = classNames('toolbar__item', { 'toolbar__item--active': this.props.active })

    return (
      <li className={className}>
        <button
          onClick={() => ToolbarItem.toggleAction(this.props)}
          type='button'
          className='toolbar__button'>
          <Icon />
        </button>
      </li>
    )
  }
}
