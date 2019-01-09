var canvasBox = document.getElementById("canvasBox");
var W = canvasBox.clientWidth;
var H = canvasBox.clientHeight;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)

var num = 0;
var scene, camera, renderer, light;
function intScene() {
    scene = new THREE.Scene()
}

function intCamera () {
    camera = new THREE.PerspectiveCamera(45, W/H, 1,1000);
    camera.position.set(0, 0, 500);
    camera.up.set(0, 1, 0)
    camera.lookAt({x: 0, y:0, z:0})
}

function intRender() {
    renderer = new THREE.WebGLRenderer({antialias:true})
    renderer.setSize(W, H)
    canvasBox.appendChild(renderer.domElement)
}

function intLight() {
    light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(50, 50, 500)
    scene.add(light)
}

var xkbg, earth, cloud;
var SEPARATION = 25, AMOUNTX = 34, AMOUNTY = 20;
var particles, particle, count = 0;
function intModels() {
  /* 宇宙背景 */
  var yz_geometry = new THREE.SphereGeometry(500, 500, 50);
  var yz_material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('./image/negy.jpg'),
    side: THREE.DoubleSide
  });
  xkbg = new THREE.Mesh(yz_geometry, yz_material);
  xkbg.position.set(0, 0, 0);
  scene.add(xkbg);
  //地球
  var earth_geometry = new THREE.SphereGeometry(100, 50, 50);
  var earth_material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('./image/earth4.jpg'),
    side: THREE.DoubleSide
  });
  earth = new THREE.Mesh(earth_geometry, earth_material);
  earth.position.set(0, 0, 0);
  earth.rotation.x = 0.42;
  earth.rotation.y = 60;
  scene.add(earth);
  //云层
  var cloud_geometry = new THREE.SphereGeometry(101, 50, 50);
  var cloud_material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('./image/earth_cloud.png'),
    transparent: true,
    opacity: .8
  });
  cloud = new THREE.Mesh(cloud_geometry, cloud_material);
  cloud.position.set(0, 0, 0);
  earth.add(cloud);
  //云层2
  var cloud2_geometry = new THREE.SphereGeometry(102, 50, 50);
  var cloud2_material = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('./image/earth_cloud.png'),
    transparent: true,
    opacity: .8
  });
  cloud2 = new THREE.Mesh(cloud2_geometry, cloud2_material);
  cloud2.position.set(0, 0, 0);
  cloud2.rotation.y = 10;
  earth.add(cloud2);
}

var mouseX, mouseY, isMove = true;
//自转
function zizhuan() {
  if (isMove) {
    requestAnimationFrame(zizhuan);
    earth.rotation.y -= 0.0005;
    renderer.render(scene, camera);
  }
  xkbg.rotation.y -= 0.0005;
}
//拖拽
document.onmousedown = function(e) {
  isMove = false;
  mouseX = e.pageX;
  mouseY = e.pageY;
}
document.onmousemove = function rt(e) {
  if (!isMove) {
    var disX = e.pageX - mouseX;
    var disY = e.pageY - mouseY;
    requestAnimationFrame(zizhuan);
    earth.rotation.x = earth.rotation.x > 0.8 ? 0.8 : earth.rotation.x;
    earth.rotation.x = earth.rotation.x < -0.8 ? -0.8 : earth.rotation.x;
    earth.rotation.x += disY * 0.00005 * Math.PI;
    earth.rotation.y += disX * 0.00005 * Math.PI;
    renderer.render(scene, camera);
  }
}
document.onmouseup = function() {
  isMove = true;
  setTimeout(function() {
    zizhuan();
  }, 1000)
}

//滑动鼠标让地球放大缩小
function intsScale() {
  $(document).on('mousewheel DOMMouseScroll', function(ev) {
    var e = ev || event;
    e.preventDefault();
    var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    var delta = Math.max(-1, Math.min(1, value));
    if (delta == 1) {
      num++;
      num = num > 10 ? 10 : num;
    } else {
      num--;
      num = num < -15 ? -15 : num;
    }
    camera.position.set(0, 0, 400 + num * 10);
  });
}

function intStart() {
  intScene();
  intCamera();
  intRender();
  intLight();
  intModels();
  zizhuan();
  intsScale();
  renderer.render(scene, camera);
}

intStart();
