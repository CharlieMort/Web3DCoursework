import{C as $,V as x,E as ee,M as N,O as te,B as se,F,S as b,U as H,a as f,W as T,H as _,N as z,b as X,c as w,d as ie,D as I,R as re,e as ae,A as ne,f as oe,g as le,h as ue,P as he,i as ce,j as de,k as fe,l as pe,m as me,n as ge,o as ve,p as xe,q as V,r as m}from"./main-BgTkVkWZ.js";const k=new ee(0,0,0,"YXZ"),B=new x,we={type:"change"},Me={type:"lock"},Se={type:"unlock"},Q=.002,j=Math.PI/2;class Te extends ${constructor(e,s=null){super(e,s),this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Ce.bind(this),this._onPointerlockChange=ye.bind(this),this._onPointerlockError=_e.bind(this),this.domElement!==null&&this.connect(this.domElement)}connect(e){super.connect(e),this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(e){if(this.enabled===!1)return;const s=this.object;B.setFromMatrixColumn(s.matrix,0),B.crossVectors(s.up,B),s.position.addScaledVector(B,e)}moveRight(e){if(this.enabled===!1)return;const s=this.object;B.setFromMatrixColumn(s.matrix,0),s.position.addScaledVector(B,e)}lock(e=!1){this.domElement.requestPointerLock({unadjustedMovement:e})}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function Ce(l){if(this.enabled===!1||this.isLocked===!1)return;const e=this.object;k.setFromQuaternion(e.quaternion),k.y-=l.movementX*Q*this.pointerSpeed,k.x-=l.movementY*Q*this.pointerSpeed,k.x=Math.max(j-this.maxPolarAngle,Math.min(j-this.minPolarAngle,k.x)),e.quaternion.setFromEuler(k),this.dispatchEvent(we)}function ye(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Me),this.isLocked=!0):(this.dispatchEvent(Se),this.isLocked=!1)}function _e(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}class D{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const be=new te(-1,1,1,-1,0,1);class ke extends se{constructor(){super(),this.setAttribute("position",new F([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new F([0,2,0,0,2,0],2))}}const Be=new ke;class q{constructor(e){this._mesh=new N(Be,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,be)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}const Y={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Pe extends D{constructor(e,s="tDiffuse"){super(),this.textureID=s,this.uniforms=null,this.material=null,e instanceof b?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=H.clone(e.uniforms),this.material=new b({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new q(this.material)}render(e,s,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class G extends D{constructor(e,s){super(),this.scene=e,this.camera=s,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,s,i){const r=e.getContext(),t=e.state;t.buffers.color.setMask(!1),t.buffers.depth.setMask(!1),t.buffers.color.setLocked(!0),t.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),t.buffers.stencil.setTest(!0),t.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),t.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),t.buffers.stencil.setClear(o),t.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),t.buffers.color.setLocked(!1),t.buffers.depth.setLocked(!1),t.buffers.color.setMask(!0),t.buffers.depth.setMask(!0),t.buffers.stencil.setLocked(!1),t.buffers.stencil.setFunc(r.EQUAL,1,4294967295),t.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),t.buffers.stencil.setLocked(!0)}}class Ee extends D{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class De{constructor(e,s){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),s===void 0){const i=e.getSize(new f);this._width=i.width,this._height=i.height,s=new T(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_}),s.texture.name="EffectComposer.rt1"}else this._width=s.width,this._height=s.height;this.renderTarget1=s,this.renderTarget2=s.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Pe(Y),this.copyPass.material.blending=z,this.clock=new X}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,s){this.passes.splice(s,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const s=this.passes.indexOf(e);s!==-1&&this.passes.splice(s,1)}isLastEnabledPass(e){for(let s=e+1;s<this.passes.length;s++)if(this.passes[s].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const s=this.renderer.getRenderTarget();let i=!1;for(let r=0,t=this.passes.length;r<t;r++){const a=this.passes[r];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),a.needsSwap){if(i){const o=this.renderer.getContext(),d=this.renderer.state.buffers.stencil;d.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),d.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}G!==void 0&&(a instanceof G?i=!0:a instanceof Ee&&(i=!1))}}this.renderer.setRenderTarget(s)}reset(e){if(e===void 0){const s=this.renderer.getSize(new f);this._pixelRatio=this.renderer.getPixelRatio(),this._width=s.width,this._height=s.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,s){this._width=e,this._height=s;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let t=0;t<this.passes.length;t++)this.passes[t].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class C extends D{constructor(e,s,i,r){super(),this.renderScene=s,this.renderCamera=i,this.selectedObjects=r!==void 0?r:[],this.visibleEdgeColor=new w(1,1,1),this.hiddenEdgeColor=new w(.1,.04,.02),this.edgeGlow=0,this.usePatternTexture=!1,this.patternTexture=null,this.edgeThickness=1,this.edgeStrength=3,this.downSampleRatio=2,this.pulsePeriod=0,this._visibilityCache=new Map,this._selectionCache=new Set,this.resolution=e!==void 0?new f(e.x,e.y):new f(256,256);const t=Math.round(this.resolution.x/this.downSampleRatio),a=Math.round(this.resolution.y/this.downSampleRatio);this.renderTargetMaskBuffer=new T(this.resolution.x,this.resolution.y),this.renderTargetMaskBuffer.texture.name="OutlinePass.mask",this.renderTargetMaskBuffer.texture.generateMipmaps=!1,this.depthMaterial=new ie,this.depthMaterial.side=I,this.depthMaterial.depthPacking=re,this.depthMaterial.blending=z,this.prepareMaskMaterial=this._getPrepareMaskMaterial(),this.prepareMaskMaterial.side=I,this.prepareMaskMaterial.fragmentShader=y(this.prepareMaskMaterial.fragmentShader,this.renderCamera),this.renderTargetDepthBuffer=new T(this.resolution.x,this.resolution.y,{type:_}),this.renderTargetDepthBuffer.texture.name="OutlinePass.depth",this.renderTargetDepthBuffer.texture.generateMipmaps=!1,this.renderTargetMaskDownSampleBuffer=new T(t,a,{type:_}),this.renderTargetMaskDownSampleBuffer.texture.name="OutlinePass.depthDownSample",this.renderTargetMaskDownSampleBuffer.texture.generateMipmaps=!1,this.renderTargetBlurBuffer1=new T(t,a,{type:_}),this.renderTargetBlurBuffer1.texture.name="OutlinePass.blur1",this.renderTargetBlurBuffer1.texture.generateMipmaps=!1,this.renderTargetBlurBuffer2=new T(Math.round(t/2),Math.round(a/2),{type:_}),this.renderTargetBlurBuffer2.texture.name="OutlinePass.blur2",this.renderTargetBlurBuffer2.texture.generateMipmaps=!1,this.edgeDetectionMaterial=this._getEdgeDetectionMaterial(),this.renderTargetEdgeBuffer1=new T(t,a,{type:_}),this.renderTargetEdgeBuffer1.texture.name="OutlinePass.edge1",this.renderTargetEdgeBuffer1.texture.generateMipmaps=!1,this.renderTargetEdgeBuffer2=new T(Math.round(t/2),Math.round(a/2),{type:_}),this.renderTargetEdgeBuffer2.texture.name="OutlinePass.edge2",this.renderTargetEdgeBuffer2.texture.generateMipmaps=!1;const o=4,d=4;this.separableBlurMaterial1=this._getSeparableBlurMaterial(o),this.separableBlurMaterial1.uniforms.texSize.value.set(t,a),this.separableBlurMaterial1.uniforms.kernelRadius.value=1,this.separableBlurMaterial2=this._getSeparableBlurMaterial(d),this.separableBlurMaterial2.uniforms.texSize.value.set(Math.round(t/2),Math.round(a/2)),this.separableBlurMaterial2.uniforms.kernelRadius.value=d,this.overlayMaterial=this._getOverlayMaterial();const p=Y;this.copyUniforms=H.clone(p.uniforms),this.materialCopy=new b({uniforms:this.copyUniforms,vertexShader:p.vertexShader,fragmentShader:p.fragmentShader,blending:z,depthTest:!1,depthWrite:!1}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new w,this.oldClearAlpha=1,this._fsQuad=new q(null),this.tempPulseColor1=new w,this.tempPulseColor2=new w,this.textureMatrix=new ae;function y(M,R){const S=R.isPerspectiveCamera?"perspective":"orthographic";return M.replace(/DEPTH_TO_VIEW_Z/g,S+"DepthToViewZ")}}dispose(){this.renderTargetMaskBuffer.dispose(),this.renderTargetDepthBuffer.dispose(),this.renderTargetMaskDownSampleBuffer.dispose(),this.renderTargetBlurBuffer1.dispose(),this.renderTargetBlurBuffer2.dispose(),this.renderTargetEdgeBuffer1.dispose(),this.renderTargetEdgeBuffer2.dispose(),this.depthMaterial.dispose(),this.prepareMaskMaterial.dispose(),this.edgeDetectionMaterial.dispose(),this.separableBlurMaterial1.dispose(),this.separableBlurMaterial2.dispose(),this.overlayMaterial.dispose(),this.materialCopy.dispose(),this._fsQuad.dispose()}setSize(e,s){this.renderTargetMaskBuffer.setSize(e,s),this.renderTargetDepthBuffer.setSize(e,s);let i=Math.round(e/this.downSampleRatio),r=Math.round(s/this.downSampleRatio);this.renderTargetMaskDownSampleBuffer.setSize(i,r),this.renderTargetBlurBuffer1.setSize(i,r),this.renderTargetEdgeBuffer1.setSize(i,r),this.separableBlurMaterial1.uniforms.texSize.value.set(i,r),i=Math.round(i/2),r=Math.round(r/2),this.renderTargetBlurBuffer2.setSize(i,r),this.renderTargetEdgeBuffer2.setSize(i,r),this.separableBlurMaterial2.uniforms.texSize.value.set(i,r)}render(e,s,i,r,t){if(this.selectedObjects.length>0){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,t&&e.state.buffers.stencil.setTest(!1),e.setClearColor(16777215,1),this._updateSelectionCache(),this._changeVisibilityOfSelectedObjects(!1);const o=this.renderScene.background,d=this.renderScene.overrideMaterial;if(this.renderScene.background=null,this.renderScene.overrideMaterial=this.depthMaterial,e.setRenderTarget(this.renderTargetDepthBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfSelectedObjects(!0),this._visibilityCache.clear(),this._updateTextureMatrix(),this._changeVisibilityOfNonSelectedObjects(!1),this.renderScene.overrideMaterial=this.prepareMaskMaterial,this.prepareMaskMaterial.uniforms.cameraNearFar.value.set(this.renderCamera.near,this.renderCamera.far),this.prepareMaskMaterial.uniforms.depthTexture.value=this.renderTargetDepthBuffer.texture,this.prepareMaskMaterial.uniforms.textureMatrix.value=this.textureMatrix,e.setRenderTarget(this.renderTargetMaskBuffer),e.clear(),e.render(this.renderScene,this.renderCamera),this._changeVisibilityOfNonSelectedObjects(!0),this._visibilityCache.clear(),this._selectionCache.clear(),this.renderScene.background=o,this.renderScene.overrideMaterial=d,this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetMaskBuffer.texture,e.setRenderTarget(this.renderTargetMaskDownSampleBuffer),e.clear(),this._fsQuad.render(e),this.tempPulseColor1.copy(this.visibleEdgeColor),this.tempPulseColor2.copy(this.hiddenEdgeColor),this.pulsePeriod>0){const p=.625+Math.cos(performance.now()*.01/this.pulsePeriod)*.75/2;this.tempPulseColor1.multiplyScalar(p),this.tempPulseColor2.multiplyScalar(p)}this._fsQuad.material=this.edgeDetectionMaterial,this.edgeDetectionMaterial.uniforms.maskTexture.value=this.renderTargetMaskDownSampleBuffer.texture,this.edgeDetectionMaterial.uniforms.texSize.value.set(this.renderTargetMaskDownSampleBuffer.width,this.renderTargetMaskDownSampleBuffer.height),this.edgeDetectionMaterial.uniforms.visibleEdgeColor.value=this.tempPulseColor1,this.edgeDetectionMaterial.uniforms.hiddenEdgeColor.value=this.tempPulseColor2,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial1,this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=C.BlurDirectionX,this.separableBlurMaterial1.uniforms.kernelRadius.value=this.edgeThickness,e.setRenderTarget(this.renderTargetBlurBuffer1),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial1.uniforms.colorTexture.value=this.renderTargetBlurBuffer1.texture,this.separableBlurMaterial1.uniforms.direction.value=C.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer1),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.separableBlurMaterial2,this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetEdgeBuffer1.texture,this.separableBlurMaterial2.uniforms.direction.value=C.BlurDirectionX,e.setRenderTarget(this.renderTargetBlurBuffer2),e.clear(),this._fsQuad.render(e),this.separableBlurMaterial2.uniforms.colorTexture.value=this.renderTargetBlurBuffer2.texture,this.separableBlurMaterial2.uniforms.direction.value=C.BlurDirectionY,e.setRenderTarget(this.renderTargetEdgeBuffer2),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.overlayMaterial,this.overlayMaterial.uniforms.maskTexture.value=this.renderTargetMaskBuffer.texture,this.overlayMaterial.uniforms.edgeTexture1.value=this.renderTargetEdgeBuffer1.texture,this.overlayMaterial.uniforms.edgeTexture2.value=this.renderTargetEdgeBuffer2.texture,this.overlayMaterial.uniforms.patternTexture.value=this.patternTexture,this.overlayMaterial.uniforms.edgeStrength.value=this.edgeStrength,this.overlayMaterial.uniforms.edgeGlow.value=this.edgeGlow,this.overlayMaterial.uniforms.usePatternTexture.value=this.usePatternTexture,t&&e.state.buffers.stencil.setTest(!0),e.setRenderTarget(i),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}this.renderToScreen&&(this._fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=i.texture,e.setRenderTarget(null),this._fsQuad.render(e))}_updateSelectionCache(){const e=this._selectionCache;function s(i){i.isMesh&&e.add(i)}e.clear();for(let i=0;i<this.selectedObjects.length;i++)this.selectedObjects[i].traverse(s)}_changeVisibilityOfSelectedObjects(e){const s=this._visibilityCache;for(const i of this._selectionCache)e===!0?i.visible=s.get(i):(s.set(i,i.visible),i.visible=e)}_changeVisibilityOfNonSelectedObjects(e){const s=this._visibilityCache,i=this._selectionCache;function r(t){if(t.isPoints||t.isLine||t.isLine2)e===!0?t.visible=s.get(t):(s.set(t,t.visible),t.visible=e);else if((t.isMesh||t.isSprite)&&!i.has(t)){const a=t.visible;(e===!1||s.get(t)===!0)&&(t.visible=e),s.set(t,a)}}this.renderScene.traverse(r)}_updateTextureMatrix(){this.textureMatrix.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),this.textureMatrix.multiply(this.renderCamera.projectionMatrix),this.textureMatrix.multiply(this.renderCamera.matrixWorldInverse)}_getPrepareMaskMaterial(){return new b({uniforms:{depthTexture:{value:null},cameraNearFar:{value:new f(.5,.5)},textureMatrix:{value:null}},vertexShader:`#include <batching_pars_vertex>
				#include <morphtarget_pars_vertex>
				#include <skinning_pars_vertex>

				varying vec4 projTexCoord;
				varying vec4 vPosition;
				uniform mat4 textureMatrix;

				void main() {

					#include <batching_vertex>
					#include <skinbase_vertex>
					#include <begin_vertex>
					#include <morphtarget_vertex>
					#include <skinning_vertex>
					#include <project_vertex>

					vPosition = mvPosition;

					vec4 worldPosition = vec4( transformed, 1.0 );

					#ifdef USE_INSTANCING

						worldPosition = instanceMatrix * worldPosition;

					#endif

					worldPosition = modelMatrix * worldPosition;

					projTexCoord = textureMatrix * worldPosition;

				}`,fragmentShader:`#include <packing>
				varying vec4 vPosition;
				varying vec4 projTexCoord;
				uniform sampler2D depthTexture;
				uniform vec2 cameraNearFar;

				void main() {

					float depth = unpackRGBAToDepth(texture2DProj( depthTexture, projTexCoord ));
					float viewZ = - DEPTH_TO_VIEW_Z( depth, cameraNearFar.x, cameraNearFar.y );
					float depthTest = (-vPosition.z > viewZ) ? 1.0 : 0.0;
					gl_FragColor = vec4(0.0, depthTest, 1.0, 1.0);

				}`})}_getEdgeDetectionMaterial(){return new b({uniforms:{maskTexture:{value:null},texSize:{value:new f(.5,.5)},visibleEdgeColor:{value:new x(1,1,1)},hiddenEdgeColor:{value:new x(1,1,1)}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform vec2 texSize;
				uniform vec3 visibleEdgeColor;
				uniform vec3 hiddenEdgeColor;

				void main() {
					vec2 invSize = 1.0 / texSize;
					vec4 uvOffset = vec4(1.0, 0.0, 0.0, 1.0) * vec4(invSize, invSize);
					vec4 c1 = texture2D( maskTexture, vUv + uvOffset.xy);
					vec4 c2 = texture2D( maskTexture, vUv - uvOffset.xy);
					vec4 c3 = texture2D( maskTexture, vUv + uvOffset.yw);
					vec4 c4 = texture2D( maskTexture, vUv - uvOffset.yw);
					float diff1 = (c1.r - c2.r)*0.5;
					float diff2 = (c3.r - c4.r)*0.5;
					float d = length( vec2(diff1, diff2) );
					float a1 = min(c1.g, c2.g);
					float a2 = min(c3.g, c4.g);
					float visibilityFactor = min(a1, a2);
					vec3 edgeColor = 1.0 - visibilityFactor > 0.001 ? visibleEdgeColor : hiddenEdgeColor;
					gl_FragColor = vec4(edgeColor, 1.0) * vec4(d);
				}`})}_getSeparableBlurMaterial(e){return new b({defines:{MAX_RADIUS:e},uniforms:{colorTexture:{value:null},texSize:{value:new f(.5,.5)},direction:{value:new f(.5,.5)},kernelRadius:{value:1}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;
				uniform float kernelRadius;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}

				void main() {
					vec2 invSize = 1.0 / texSize;
					float sigma = kernelRadius/2.0;
					float weightSum = gaussianPdf(0.0, sigma);
					vec4 diffuseSum = texture2D( colorTexture, vUv) * weightSum;
					vec2 delta = direction * invSize * kernelRadius/float(MAX_RADIUS);
					vec2 uvOffset = delta;
					for( int i = 1; i <= MAX_RADIUS; i ++ ) {
						float x = kernelRadius * float(i) / float(MAX_RADIUS);
						float w = gaussianPdf(x, sigma);
						vec4 sample1 = texture2D( colorTexture, vUv + uvOffset);
						vec4 sample2 = texture2D( colorTexture, vUv - uvOffset);
						diffuseSum += ((sample1 + sample2) * w);
						weightSum += (2.0 * w);
						uvOffset += delta;
					}
					gl_FragColor = diffuseSum/weightSum;
				}`})}_getOverlayMaterial(){return new b({uniforms:{maskTexture:{value:null},edgeTexture1:{value:null},edgeTexture2:{value:null},patternTexture:{value:null},edgeStrength:{value:1},edgeGlow:{value:1},usePatternTexture:{value:0}},vertexShader:`varying vec2 vUv;

				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;

				uniform sampler2D maskTexture;
				uniform sampler2D edgeTexture1;
				uniform sampler2D edgeTexture2;
				uniform sampler2D patternTexture;
				uniform float edgeStrength;
				uniform float edgeGlow;
				uniform bool usePatternTexture;

				void main() {
					vec4 edgeValue1 = texture2D(edgeTexture1, vUv);
					vec4 edgeValue2 = texture2D(edgeTexture2, vUv);
					vec4 maskColor = texture2D(maskTexture, vUv);
					vec4 patternColor = texture2D(patternTexture, 6.0 * vUv);
					float visibilityFactor = 1.0 - maskColor.g > 0.0 ? 1.0 : 0.5;
					vec4 edgeValue = edgeValue1 + edgeValue2 * edgeGlow;
					vec4 finalColor = edgeStrength * maskColor.r * edgeValue;
					if(usePatternTexture)
						finalColor += + visibilityFactor * (1.0 - maskColor.r) * (1.0 - patternColor.r);
					gl_FragColor = finalColor;
				}`,blending:ne,depthTest:!1,depthWrite:!1,transparent:!0})}}C.BlurDirectionX=new f(1,0);C.BlurDirectionY=new f(0,1);class Re extends D{constructor(e,s,i=null,r=null,t=null){super(),this.scene=e,this.camera=s,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=t,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new w}render(e,s,i){const r=e.autoClear;e.autoClear=!1;let t,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(t=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(t),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}}class W{constructor(e,s,i,r,t,a){this.scale=new x(r,t,a),this.geometry=new oe(this.scale.x,this.scale.y,this.scale.z),this.material=new le({color:16711680}),this.mesh=new N(this.geometry,this.material),this.mesh.position.set(e,s,i)}setColor(e){this.material.color=e}}const c=[];class ze{constructor(e,s){this.scene=e,this.analyser=s}createScene(){this.visualizer=[];let e=this.analyser.getFrequencyData().length*.7-32,s=32;for(let t=0;t<e;t++){const o=Math.PI*2,d=0+t/(e-1)*(o-0);let p=s*Math.cos(d),y=s*Math.sin(d),M=new W(p,0,y,.75,2,.75);M.setColor(new w().setHSL(V.mapLinear(t,0,this.analyser.getFrequencyData().length*.7-32,.75,.75),1,.5)),this.scene.add(M.mesh),this.visualizer.push(M)}let i=new W(0,-1,0,10,1,10);i.setColor(new w(16777215)),this.scene.add(i.mesh);let r=new m("Welcome","src/welcome-to-the-arcade.glb");r.group.scale.multiplyScalar(2),r.setRotation(90,0,0),r.setPosition(0,12,-40),this.scene.add(r.group),this.updates=[];{let t=new m("Claw Machine","src/clawmachine.glb",!0);t.group.scale.multiplyScalar(.175),t.setPosition(4,-.5,0),t.setRotation(0,-Math.PI,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Claw Machine","src/clawmachine.glb",!0);t.group.scale.multiplyScalar(.175),t.setPosition(4,-.5,2),t.setRotation(0,-Math.PI,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Claw Machine","src/clawmachine.glb",!0);t.group.scale.multiplyScalar(.175),t.setPosition(4,-.5,-2),t.setRotation(0,-Math.PI,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Claw Machine","src/clawmachine.glb",!0);t.group.scale.multiplyScalar(.175),t.setPosition(4,-.5,4),t.setRotation(0,-Math.PI,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Slot Machine","src/slotmachine.glb",!0);t.group.scale.multiplyScalar(.2),t.setPosition(-4,-.5,0),t.setRotation(0,0,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Slot Machine","src/slotmachine.glb",!0);t.group.scale.multiplyScalar(.2),t.setPosition(-4,-.5,2),t.setRotation(0,0,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Slot Machine","src/slotmachine.glb",!0);t.group.scale.multiplyScalar(.2),t.setPosition(-4,-.5,-2),t.setRotation(0,0,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Slot Machine","src/slotmachine.glb",!0);t.group.scale.multiplyScalar(.2),t.setPosition(-4,-.5,4),t.setRotation(0,0,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Robot1","src/robot.glb",!0);t.group.scale.multiplyScalar(.75),t.setPosition(-15,-1,-50),t.setRotation(0,-Math.PI/2,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}{let t=new m("Robot2","src/robot.glb",!0);t.group.scale.multiplyScalar(.75),t.setPosition(15,-1,-50),t.setRotation(0,-Math.PI/2,0),this.scene.add(t.group),setTimeout(()=>{c.push(t.modelScene)},500),this.updates.push(t)}}updateScene(){let e=this.analyser.getFrequencyData(),s=0;for(let i=32;i<e.length*.7;i++){let r=V.mapLinear(e[i],0,300,.5,10);this.visualizer[s].mesh.scale.set(.75,r,.75),this.visualizer[s].mesh.position.set(this.visualizer[s].mesh.position.x,r,this.visualizer[s].mesh.position.z),s++}this.updates.map(i=>{i.update()})}}function Ae(){const l=document.querySelector("#c");if(l==null)return;const e=new ue({antialias:!0,canvas:l});e.shadowMap.enabled=!0;const s=45,i=2,r=.1,t=100,a=new he(s,i,r,t);a.position.set(0,1,5),a.lookAt(new x(0,2,-10));let o=new x(0,0,0);const d=new Te(a,document.body),p=new ce,y=new f;l.onclick=n=>{d.lock(),window.addEventListener("click",R)};function M(n,h){for(let v=0;v<c.length;v++)if(!c[v])return;y.x=n/window.innerWidth*2-1,y.y=-(h/window.innerHeight)*2+1,p.setFromCamera(y,a);const u=p.intersectObjects(c,!0);u.length>0&&(u.length>0?E.selectedObjects=[u[0].object.parent]:E.selectedObjects=[])}function R(n){M(n.clientX,n.clientY)}onmousemove=n=>{M(n.clientX,n.clientY)},onkeydown=n=>{switch(n.key.toLowerCase()){case"w":o.z=1;break;case"s":o.z=-1;break;case"a":o.x=-1;break;case"d":o.x=1;break;case"p":g.play();break}},onkeyup=n=>{switch(n.key.toLowerCase()){case"w":o.z=0;break;case"s":o.z=0;break;case"a":o.x=0;break;case"d":o.x=0;break}};const S=new fe;S.background=new w("#111");const A=new pe;a.add(A);const g=new de(A);new me().load("src/Starjunk 95 Groove District.mp3",function(n){g.setBuffer(n),g.setLoop(!0),g.setVolume(.5),g.play()}),document.getElementById("playpause").addEventListener("click",()=>{g.isPlaying?g.pause():g.play()}),document.getElementById("volume").addEventListener("input",n=>{const h=n.target;g.setVolume(parseFloat(h.value))}),document.getElementById("fullscreen").addEventListener("click",async()=>{await l.requestFullscreen()}),document.getElementById("reload").addEventListener("click",()=>{location.reload()});const Z=new ge(g,512);{const u=new ve(16777215,3);S.add(u)}{const u=new xe(16777215,6);u.position.set(100,100,100),u.lookAt(new x(0,0,0)),u.castShadow=!0,S.add(u)}let L=new ze(S,Z);L.createScene();function K(n){const h=n.domElement,u=h.clientWidth,v=h.clientHeight,U=h.width!==u||h.height!==v;return U&&n.setSize(u,v,!1),U}let J=new X;const P=new De(e);e.setPixelRatio(window.devicePixelRatio),P.setPixelRatio(window.devicePixelRatio),P.setSize(window.innerWidth,window.innerHeight),P.addPass(new Re(S,a));const E=new C(new f(window.innerWidth,window.innerHeight),S,a);E.edgeStrength=20,E.edgeThickness=10,P.addPass(E);function O(){if(requestAnimationFrame(O),K(e)){const v=e.domElement;a.aspect=v.clientWidth/v.clientHeight,a.updateProjectionMatrix()}const n=J.getDelta(),h=new x;a.getWorldDirection(h);const u=new x;u.crossVectors(h,a.up).normalize(),a.position.add(h.multiplyScalar(o.z*10*n)),a.position.add(u.multiplyScalar(o.x*10*n)),a.position.set(a.position.x,1,a.position.z),L.updateScene(),P.render()}requestAnimationFrame(O)}Ae();
