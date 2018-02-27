/** TODO

- auto scale depending on function (most of the curve must be visible !)
- input for changing function
*/


class Repere {
  constructor(el){

    // insert a canvas in the el

    let canvas = document.createElement('canvas')

    this.size = {
      w: 300,
      h: 300,
      scale: 10, // from -5 to 5
      sampling: 0.05
    }

    canvas.width = this.size.w
    canvas.height = this.size.h
    el.appendChild(canvas)

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')

    // centrage des coords
    this.ctx.translate(canvas.width / 2, canvas.height / 2)

    this.createAbscisse(this.ctx)
    this.createOrdonnee(this.ctx)
  }

  createAbscisse(ctx){
    // ligne horizontale au milieu
    let {w, h, scale} = this.size

    ctx.moveTo(-w/2, 0)
    ctx.lineTo(w/2, 0)

    let ecart = w / scale

    for(var i = -scale/2; i < scale/2; i++){
      let x = i * ecart
      ctx.moveTo( x , 0)
      ctx.lineTo( x , -5)
      if (i != 0) {
        ctx.fillText(i, x-4, 10)
      }
    }

    ctx.stroke()

  }
  createOrdonnee(ctx){
    ctx.rotate(Math.PI / 2)
    this.createAbscisse(ctx)
    ctx.rotate(-Math.PI / 2)
  }

  displayFunction(func){
    let {w, h, scale, sampling} = this.size
    let ctx = this.ctx
    ctx.fillStyle = "red"





    for(var x = -scale / 2; x < scale/2; x+=sampling ){
      let y = func(x)

      let cnv_x = x/scale * w
      let cnv_y = y/scale * h * -1 // -1 cause canvas coords on y are upside down

      ctx.fillRect(cnv_x, cnv_y, 2, 2);
    }

    let funcText = "f" +  func.toString().replace('>', '').replace("*", "")
    let textLength = ctx.measureText(funcText).width

    ctx.fillStyle = "#000"

    ctx.fillText(funcText, w/2 - textLength - 5, -h/2 + 20)

  }



}