// Scene Declartion
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// test
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
const cylinderMaterial = new THREE.MeshPhongMaterial( {color: 0x0000FF, wireframe: false} );
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
const whingMaterial1 = new THREE.MeshPhongMaterial( {color: 0x9900FF, side: THREE.DoubleSide, wireframe: false} );
const whing1 = new THREE.Mesh( whingGeometry1, whingMaterial1 );
cylinder.add(whing1);

let whing1TranslationMatrix = new THREE.Matrix4();
whing1TranslationMatrix.makeTranslation(1.5,-1,0);
whing1.applyMatrix4(whing1TranslationMatrix)
// this is whing2:
const whingGeometry2 = new THREE.PlaneGeometry( 1, 1 );
const whingMaterial2 = new THREE.MeshPhongMaterial( {color: 0x9900FF, side: THREE.DoubleSide, wireframe: false} );
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
const whingMaterial3 = new THREE.MeshPhongMaterial( {color: 0x9900FF, side: THREE.DoubleSide, wireframe: false} );
const whing3 = new THREE.Mesh( whingGeometry3, whingMaterial3 );
cylinder.add(whing3);

let whing3TranslationMatrix = new THREE.Matrix4();
whing3TranslationMatrix.makeTranslation(-1.5,-1,0);
whing3.applyMatrix4(whing3TranslationMatrix)
// this is window1:
const windowGeometry1 = new THREE.RingGeometry( 0.2, 0.3, 32 );
const windowMaterial1 = new THREE.MeshPhongMaterial( { color: 0xffff00, side: THREE.DoubleSide, wireframe: false } );
const window1 = new THREE.Mesh( windowGeometry1, windowMaterial1 );
cylinder.add(window1);

let window1TranslationMatrix = new THREE.Matrix4();
window1TranslationMatrix.makeTranslation(0,0.7,1);
window1.applyMatrix4(window1TranslationMatrix)
// this is window2:
const windowGeometry2 = new THREE.RingGeometry( 0.2, 0.3, 32 );
const windowMaterial2 = new THREE.MeshPhongMaterial( { color: 0xffff00, side: THREE.DoubleSide, wireframe: false } );
const window2 = new THREE.Mesh( windowGeometry2, windowMaterial2 );
cylinder.add(window2);

let window2TranslationMatrix = new THREE.Matrix4();
window2TranslationMatrix.makeTranslation(0,-0.1,1);
window2.applyMatrix4(window2TranslationMatrix)
// this is the head:
const geometry = new THREE.ConeGeometry( 1, 1, 32 );
const material = new THREE.MeshPhongMaterial( {color: 0xFF0000, wireframe: false } );
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
const moonMaterial = new THREE.MeshPhongMaterial( { map: moonTexture } );
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

spotLight.target = cylinder
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
	new THREE.Vector3( 35, 15, -10 ),
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
	new THREE.Vector3( 50, 15, -10 ),
	new THREE.Vector3( 140, 0, -200 )
);
const points3 = curve3.getPoints( 50 );
const curveGeometry3 = new THREE.BufferGeometry().setFromPoints( points3 );
const curveMaterial3 = new THREE.LineBasicMaterial( { color: 0xff0000 } );
const curve3Object = new THREE.Line( curveGeometry3, curveMaterial3 );
scene.add( curve3Object );

curve1Object.visible = false;
curve2Object.visible = false;
curve3Object.visible = false;


// TODO: Camera Settings
// Set the camera following the spaceship here


// TODO: Add collectible stars
// this is first start
let curve1Points = curve1.getPoints(3000);
let curve2Points = curve2.getPoints(3000);
let curve3Points = curve3.getPoints(3000);

const star1Texture = new THREE.TextureLoader().load('src/textures/star.jpg');
const star1Geometry = new THREE.SphereGeometry( 1, 32, 16 );
const star1Material = new THREE.MeshPhongMaterial( { map: star1Texture } );
const star1 = new THREE.Mesh( star1Geometry, star1Material );
scene.add( star1 );
let star1TranslationMatrix = new THREE.Matrix4();
star1TranslationMatrix.makeTranslation(curve1Points[1000].x, curve1Points[1000].y, curve1Points[1000].z);
star1.applyMatrix4(star1TranslationMatrix);

// this is second star:
const star2Texture = new THREE.TextureLoader().load('src/textures/star.jpg');
const star2Geometry = new THREE.SphereGeometry( 1, 32, 16 );
const star2Material = new THREE.MeshPhongMaterial( { map: star2Texture } );
const star2 = new THREE.Mesh( star2Geometry, star2Material );
scene.add( star2 );
let star2TranslationMatrix = new THREE.Matrix4();
star2TranslationMatrix.makeTranslation(curve2Points[1500].x, curve2Points[1500].y, curve2Points[1500].z);
star2.applyMatrix4(star2TranslationMatrix);

// this is third star:
const star3Texture = new THREE.TextureLoader().load('src/textures/star.jpg');
const star3Geometry = new THREE.SphereGeometry( 1, 32, 16 );
const star3Material = new THREE.MeshPhongMaterial( { map: star3Texture } );
const star3 = new THREE.Mesh( star3Geometry, star3Material );
scene.add( star3 );
let star3TranslationMatrix = new THREE.Matrix4();
star3TranslationMatrix.makeTranslation(curve3Points[2000].x, curve3Points[2000].y, curve3Points[2000].z);
star3.applyMatrix4(star3TranslationMatrix);

// this is fourth star:
const star4Texture = new THREE.TextureLoader().load('src/textures/star.jpg');
const star4Geometry = new THREE.SphereGeometry( 1, 32, 16 );
const star4Material = new THREE.MeshPhongMaterial( { map: star4Texture } );
const star4 = new THREE.Mesh( star4Geometry, star4Material );
scene.add( star4 );
let star4TranslationMatrix = new THREE.Matrix4();
star4TranslationMatrix.makeTranslation(curve3Points[500].x, curve3Points[500].y, curve3Points[500].z);
star4.applyMatrix4(star4TranslationMatrix);

// this is fourth star:
const star5Texture = new THREE.TextureLoader().load('src/textures/star.jpg');
const star5Geometry = new THREE.SphereGeometry( 1, 32, 16 );
const star5Material = new THREE.MeshPhongMaterial( { map: star5Texture } );
const star5 = new THREE.Mesh( star5Geometry, star5Material );
scene.add( star5 );
let star5TranslationMatrix = new THREE.Matrix4();
star5TranslationMatrix.makeTranslation(curve2Points[2500].x, curve2Points[2500].y, curve2Points[2500].z);
star5.applyMatrix4(star5TranslationMatrix);





// TODO: Add keyboard event
// We wrote some of the function for you
let curveNum = 0;
const handle_keydown = (e) => {
	if(e.code == 'ArrowLeft'){
		// TODO
		console.log('arrow left clicked');
		curveNum = curveNum - 1;
		if (curveNum < 0){
			curveNum = 2;
		}


	} else if (e.code == 'ArrowRight'){
		// TODO
		console.log('right arrow clicked');
		curveNum = curveNum + 1;
	}
}
document.addEventListener('keydown', handle_keydown);



let curvePointIdx = 50;

let cylinderTranslationMatrix = new THREE.Matrix4();
cylinderTranslationMatrix.makeTranslation(curve1Points[curvePointIdx].x, curve1Points[curvePointIdx].y, curve1Points[curvePointIdx].z);
cylinder.applyMatrix4(cylinderTranslationMatrix)

let newX = null;
let newY = null;
let newZ = null;

let playerScore = 0;
function animate() {

	requestAnimationFrame( animate );

	// TODO: Animation for the spaceship position
	if (curvePointIdx < 3000) {
		curvePointIdx = curvePointIdx + 1;

		// Check if spaceship colides with star1:
		

		if (curveNum % 3 === 0){
			if (curvePointIdx === 1000){
				star1.visible = false;
				playerScore = playerScore + 1;
			}
			newX = curve1Points[curvePointIdx].x;
			newY = curve1Points[curvePointIdx].y;
			newZ = curve1Points[curvePointIdx].z;
		}
		if (curveNum % 3 === 1){
			if (curvePointIdx === 1500){
				star2.visible = false;
				playerScore = playerScore + 1;
			}
			if (curvePointIdx === 2500){
				star5.visible = false;
				playerScore = playerScore + 1;
			}
			newX = curve2Points[curvePointIdx].x;
			newY = curve2Points[curvePointIdx].y;
			newZ = curve2Points[curvePointIdx].z;
		}
		if (curveNum % 3 === 2){
			if (curvePointIdx === 2000){
				star3.visible = false;
				playerScore = playerScore + 1;
			}
			if (curvePointIdx === 500){
				star4.visible = false;
				playerScore = playerScore + 1;
			}
			newX = curve3Points[curvePointIdx].x;
			newY = curve3Points[curvePointIdx].y;
			newZ = curve3Points[curvePointIdx].z;
		}
		let deltaX = newX - cylinder.position.x;
		let deltaY = newY - cylinder.position.y;
		let deltaZ = newZ - cylinder.position.z;

		let tempCylinderTranslationMatrix = new THREE.Matrix4();
		tempCylinderTranslationMatrix.makeTranslation(deltaX, deltaY, deltaZ);
		cylinder.applyMatrix4(tempCylinderTranslationMatrix)
	}else{
		alert(`your score is: ${playerScore}`);
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