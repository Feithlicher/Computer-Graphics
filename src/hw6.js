// Scene Declartion
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// helper function for later on
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


// Here we load the cubemap and skymap, you may change it

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'src/skybox/right.png',
  'src/skybox/left.png',
  'src/skybox/top.png',
  'src/skybox/bottom.png',
  'src/skybox/front.png',
  'src/skybox/back.png',
]);
scene.background = texture;


// TODO: Texture Loading
// We usually do the texture loading before we start everything else, as it might take processing time



// TODO: Spaceship
// You should copy-paste the spaceship from the previous exercise here
// This is a cylinder:
const cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 3, 32 );
const cylinderMaterial = new THREE.MeshBasicMaterial( {color: 0x0000FF, wireframe: true} );
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
scene.add( cylinder );

// let cylinderTranslationMatrix = new THREE.Matrix4();
// cylinderTranslationMatrix.makeTranslation(-100,-5,-100);
// cylinder.applyMatrix4(cylinderTranslationMatrix)

let cylinderScaleMatrix = new THREE.Matrix4();
cylinderScaleMatrix.makeScale(0.5,0.5,0.5);
// cylinder.applyMatrix4(cylinderScaleMatrix)
// this is whing1:
const whingGeometry1 = new THREE.PlaneGeometry( 1, 1 );
const whingMaterial1 = new THREE.MeshBasicMaterial( {color: 0x9900FF, side: THREE.DoubleSide, wireframe: true} );
const whing1 = new THREE.Mesh( whingGeometry1, whingMaterial1 );
cylinder.add(whing1);

let whing1TranslationMatrix = new THREE.Matrix4();
whing1TranslationMatrix.makeTranslation(1.5,-1,0);
whing1.applyMatrix4(whing1TranslationMatrix)
// this is whing2:
const whingGeometry2 = new THREE.PlaneGeometry( 1, 1 );
const whingMaterial2 = new THREE.MeshBasicMaterial( {color: 0x9900FF, side: THREE.DoubleSide, wireframe: true} );
const whing2 = new THREE.Mesh( whingGeometry2, whingMaterial2 );
cylinder.add(whing2);

let whing2TranslationMatrix = new THREE.Matrix4();
whing2TranslationMatrix.makeTranslation(0,-1,1);
whing2.applyMatrix4(whing1TranslationMatrix)

let wing2rotationMatrix = new THREE.Matrix4();
wing2rotationMatrix.makeRotationY(1.5708);
whing2.applyMatrix4(wing2rotationMatrix);
// this is whing3:
const whingGeometry3 = new THREE.PlaneGeometry( 1, 1 );
const whingMaterial3 = new THREE.MeshBasicMaterial( {color: 0x9900FF, side: THREE.DoubleSide, wireframe: true} );
const whing3 = new THREE.Mesh( whingGeometry3, whingMaterial3 );
cylinder.add(whing3);

let whing3TranslationMatrix = new THREE.Matrix4();
whing3TranslationMatrix.makeTranslation(-1.5,-1,0);
whing3.applyMatrix4(whing3TranslationMatrix)
// this is window1:
const windowGeometry1 = new THREE.RingGeometry( 0.2, 0.3, 32 );
const windowMaterial1 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide, wireframe: true } );
const window1 = new THREE.Mesh( windowGeometry1, windowMaterial1 );
cylinder.add(window1);

let window1TranslationMatrix = new THREE.Matrix4();
window1TranslationMatrix.makeTranslation(0,0.7,1);
window1.applyMatrix4(window1TranslationMatrix)
// this is window2:
const windowGeometry2 = new THREE.RingGeometry( 0.2, 0.3, 32 );
const windowMaterial2 = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide, wireframe: true } );
const window2 = new THREE.Mesh( windowGeometry2, windowMaterial2 );
cylinder.add(window2);

let window2TranslationMatrix = new THREE.Matrix4();
window2TranslationMatrix.makeTranslation(0,-0.1,1);
window2.applyMatrix4(window2TranslationMatrix)
// this is the head:
const geometry = new THREE.ConeGeometry( 1, 1, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xFF0000, wireframe: true } );
const cone = new THREE.Mesh( geometry, material );
cylinder.add( cone );

let coneTranslationMatrix = new THREE.Matrix4();
coneTranslationMatrix.makeTranslation(0,2,0);
cone.applyMatrix4(coneTranslationMatrix);



// TODO: Planets
// You should add both earth and the moon here
// This is the moon:
const moonTexture = new THREE.TextureLoader().load('src/textures/moon.jpg');
const moonGeometry = new THREE.SphereGeometry( 5, 32, 16 );
const moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture } );
const moon = new THREE.Mesh( moonGeometry, moonMaterial );
scene.add( moon );
let moonTranslationMatrix = new THREE.Matrix4();
moonTranslationMatrix.makeTranslation(0,0,-10);
moon.applyMatrix4(moonTranslationMatrix);

// This is earth:
const earthTexture = new THREE.TextureLoader().load('src/textures/earth.jpg');
const earthGeometry = new THREE.SphereGeometry( 7, 32, 16 );
const earthMaterial = new THREE.MeshPhongMaterial( { map: earthTexture } );
const earth = new THREE.Mesh( earthGeometry, earthMaterial );
scene.add( earth );
let earthTranslationMatrix = new THREE.Matrix4();
earthTranslationMatrix.makeTranslation(140,0,-200);
earth.applyMatrix4(earthTranslationMatrix);


// TODO: Add Lighting
// const directionalLight = new THREE.DirectionalLight( 0xFFFF00, 0.5 );
// scene.add( directionalLight );
// scene.add( directionalLight.target );

// Directional light:
var dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 5, -10);
// dl.target.set(0, 0, -10);
dl.target = earth;
scene.add(dl);

// Spot light:
const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 5, -10 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );




// TODO: Bezier Curves
// First curve:
const curve1 = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3(0,0,-10),
	new THREE.Vector3( 20, 15, -10 ),
	new THREE.Vector3( 140, 0, -200 )
);
const points1 = curve1.getPoints( 50 );
const curveGeometry1 = new THREE.BufferGeometry().setFromPoints( points1 );
const curveMaterial1 = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const curve1Object = new THREE.Line( curveGeometry1, curveMaterial1 );
scene.add( curve1Object );

// Second curve:
const curve2 = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3(0,0,-10),
	new THREE.Vector3( 50, 15, -10 ),
	new THREE.Vector3( 140, 0, -200 )
);
const points2 = curve2.getPoints( 50 );
const curveGeometry2 = new THREE.BufferGeometry().setFromPoints( points2 );
const curveMaterial2 = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const curve2Object = new THREE.Line( curveGeometry2, curveMaterial2 );
scene.add( curve2Object );

// Third curve:
const curve3 = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3(0,0,-10),
	new THREE.Vector3( 35, 15, -10 ),
	new THREE.Vector3( 140, 0, -200 )
);
const points3 = curve3.getPoints( 50 );
const curveGeometry3 = new THREE.BufferGeometry().setFromPoints( points3 );
const curveMaterial3 = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const curve3Object = new THREE.Line( curveGeometry3, curveMaterial3 );
scene.add( curve3Object );


// TODO: Camera Settings
// Set the camera following the spaceship here


// TODO: Add collectible stars



// TODO: Add keyboard event
// We wrote some of the function for you
const handle_keydown = (e) => {
	if(e.code == 'ArrowLeft'){
		// TODO
		console.log('arrow left');
		console.log(cylinder.position);
	} else if (e.code == 'ArrowRight'){
		// TODO
	}
}
document.addEventListener('keydown', handle_keydown);


let curve1Points = curve1.getPoints(3000);
let curvePointIdx = 50;

let cylinderTranslationMatrix = new THREE.Matrix4();
cylinderTranslationMatrix.makeTranslation(curve1Points[curvePointIdx].x, curve1Points[curvePointIdx].y, curve1Points[curvePointIdx].z);
cylinder.applyMatrix4(cylinderTranslationMatrix)



function animate() {

	requestAnimationFrame( animate );

	// TODO: Animation for the spaceship position
	if (curvePointIdx < 3000) {
		curvePointIdx = curvePointIdx + 1;
		let newX = curve1Points[curvePointIdx].x;
		let newY = curve1Points[curvePointIdx].y;
		let newZ = curve1Points[curvePointIdx].z;
		let deltaX = newX - cylinder.position.x;
		let deltaY = newY - cylinder.position.y;
		let deltaZ = newZ - cylinder.position.z;

		let tempCylinderTranslationMatrix = new THREE.Matrix4();
		tempCylinderTranslationMatrix.makeTranslation(deltaX, deltaY, deltaZ);
		cylinder.applyMatrix4(tempCylinderTranslationMatrix)
	}


	// TODO: Test for star-spaceship collision
	// scene.applyMatrix4(sceneTranslationMatrix);
	
	camera.position.x = cylinder.position.x;
	camera.position.y = cylinder.position.y;
	camera.position.z = cylinder.position.z + 10;
	// camera.position.z = camera.position.z - 0.015;


	
	renderer.render( scene, camera );

}
animate()