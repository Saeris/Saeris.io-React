import smartcrop from "smartcrop"
import "./thumbnail.scss"

export default class Thumbnail extends Component {
  load(src) {
    this.img = new Image()
    this.img.crossOrigin = `Anonymous`
    this.img.onload = () => {
      this.options = { ...this.options, width: this.img.naturalWidth * 1, height: this.img.naturalHeight * 1 }
      this.analyze(this.options)
    }
    this.img.src = src
  }

  analyze(options) {
    smartcrop.crop(this.img, options, result => $(this.container).prepend(this.draw(result)))
  }

  draw(result) {
    let crop = result.topCrop
    this.log.debug(result)
    let canvas = document.createElement(`canvas`)
    let ctx = canvas.getContext(`2d`)
    canvas.width = this.options.width
    canvas.height = this.options.width
    ctx.drawImage(this.img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height)
    $(this.spinner).remove()
    return canvas
  }
}
