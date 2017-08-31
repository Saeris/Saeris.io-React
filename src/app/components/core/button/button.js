export default class Button extends Compnent {
  static propTypes = {
    active: PropTypes.bool,
    block: PropTypes.bool,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    outline: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    getRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    onClick: PropTypes.func,
    size: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    cssModule: PropTypes.object
  }

  static defaultProps = {
    color: `secondary`,
    tag: `button`
  }

  onClick = this.onClick.bind(this)

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault()
      return
    }

    if (this.props.onClick) this.props.onClick(e)
  }

  renter({ active, block, className, cssModule, color, outline, size, tag: Tag, getRef, ...attributes }) {
    const classes = mapToCssModules(
      classNames(
        className,
        `btn`,
        `btn${outline ? `-outline` : ``}-${color}`,
        size ? `btn-${size}` : false,
        block ? `btn-block` : false,
        { active, disabled: this.props.disabled }
      ),
      cssModule
    )

    if (attributes.href && Tag === `button`) Tag = `a`

    return (
      <Tag
        type={Tag === `button` && attributes.onClick ? `button` : undefined}
        {...attributes}
        className={classes}
        ref={getRef}
        onClick={this.onClick}
      />
    )
  }
}
