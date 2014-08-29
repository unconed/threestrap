/**
 * Allows a stack of renderers to be treated as a single renderer.
 * @author Gheric Speiginer
 */

THREE.MultiRenderer = function ( parameters ) {

  console.log( 'THREE.MultiRenderer', THREE.REVISION )

  this.domElement = document.createElement( 'div' )
  this.domElement.style.position = 'relative'

  this.renderers = []
  this._renderSizeSet = false

  var rendererClasses = parameters.renderers || []
  var rendererParameters = parameters.parameters || []

  // elements are stacked back-to-front
  for ( var i = 0; i < rendererClasses.length; i++ ) {
    var renderer = new rendererClasses[i]( rendererParameters[i] )
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    this.domElement.appendChild( renderer.domElement )
    this.renderers.push( renderer )
  }

}

THREE.MultiRenderer.prototype.setSize = function( w, h ) {

  this.domElement.style.width = w + 'px'
  this.domElement.style.height = h + 'px'

  for ( var i = 0; i < this.renderers.length; i++ ) {
    var renderer = this.renderers[i]
    var el = renderer.domElement

    if ( !this._renderSizeSet || ( el && el.tagName !== 'CANVAS' ) ) {
      renderer.setSize( w, h )
    }

    el.style.width = w + 'px'
    el.style.height = h + 'px'
  }

}

THREE.MultiRenderer.prototype.setRenderSize = function( rw, rh ) {

  this._renderSizeSet = true

  for ( var i = 0; i < this.renderers.length; i++ ) {
    var renderer = this.renderers[i]
    var el = renderer.domElement

    if ( el && el.tagName === 'CANVAS' ) {
      renderer.setSize( rw, rh, false )
    }
  }

}

THREE.MultiRenderer.prototype.render = function( scene, camera ) {

  for ( var i = 0; i < this.renderers.length; i++ ) {
    this.renderers[i].render( scene, camera )
  }

}
