/** TODO

- auto scale depending on function (most of the curve must be visible !)
- input for changing function
- animate function over time (give a range for coefs)
*/


class Repere {
  constructor(canvas){

    // insert a canvas in the el


    this.size = {
      w: 300,
      h: 300,
      scale: 10, // from -5 to 5
      sampling: 0.05
    }

    canvas.width = this.size.w
    canvas.height = this.size.h

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
      }else{
        ctx.fillText(i, 10, 10)

      }
    }

    ctx.stroke()

  }
  createOrdonnee(ctx){
     // ligne horizontale au milieu
    let {w, h, scale} = this.size

    ctx.moveTo(0, -h/2)
    ctx.lineTo(0, h/2)

    let ecart = h / scale

    for(var i = -scale/2; i < scale/2; i++){
      let y = i * ecart
      ctx.moveTo( 0, y)
      ctx.lineTo( 5, y)
      if (i != 0) {
        ctx.fillText(i, 10, y+2)
      }
    }

    ctx.stroke()
  }

  displayFunction(func){
    let {w, h, scale} = this.size
    let ctx = this.ctx
    ctx.fillStyle = "red"

    let sampling_x = scale / w
    let sampling_y = scale / h

    let sampling = Math.min(sampling_x, sampling_y)

    for(var x = -scale / 2; x < scale/2; x+=sampling ){
      let y = func(x)

      let cnv_x = x/scale * w
      let cnv_y = y/scale * h * -1 // -1 cause canvas coords on y are upside down

      ctx.fillRect(cnv_x, cnv_y, 1, 1);
    }

    let funcText = "f" +  func.toString().replace('>', '')
    let textLength = ctx.measureText(funcText).width

    ctx.fillStyle = "#000"

    ctx.fillText(funcText, w/2 - textLength - 5, -h/2 + 20)

  }



}