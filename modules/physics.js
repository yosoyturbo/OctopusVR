import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js';
export function startPhysics(canvas){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#041522');scene.fog=new THREE.Fog('#041522',15,45);
 const camera=new THREE.PerspectiveCamera(65,1,.1,100);camera.position.set(6,6,10);camera.lookAt(0,1,0);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;
 scene.add(new THREE.HemisphereLight(0x9beeff,0x151020,2));let light=new THREE.DirectionalLight(0xffffff,2);light.position.set(5,9,5);scene.add(light);
 const world=new CANNON.World({gravity:new CANNON.Vec3(0,-9.82,0)});world.broadphase=new CANNON.SAPBroadphase(world);world.allowSleep=true;
 let objects=[];const floor=new THREE.Mesh(new THREE.PlaneGeometry(30,30),new THREE.MeshStandardMaterial({color:0x0a3346}));floor.rotation.x=-Math.PI/2;scene.add(floor);scene.add(new THREE.GridHelper(30,30,0x00eaff,0x16465c));
 let ground=new CANNON.Body({mass:0,shape:new CANNON.Plane()});ground.quaternion.setFromEuler(-Math.PI/2,0,0);world.addBody(ground);
 function box(){let s=1;let mesh=new THREE.Mesh(new THREE.BoxGeometry(s,s,s),new THREE.MeshStandardMaterial({color:0x00eaff,metalness:.25,roughness:.3}));mesh.castShadow=true;scene.add(mesh);let body=new CANNON.Body({mass:1,shape:new CANNON.Box(new CANNON.Vec3(.5,.5,.5)),position:new CANNON.Vec3((Math.random()-.5)*3,4,0)});world.addBody(body);objects.push({mesh,body});return body}
 function ball(){let r=.5,mesh=new THREE.Mesh(new THREE.SphereGeometry(r,24,18),new THREE.MeshStandardMaterial({color:0xb65cff}));scene.add(mesh);let body=new CANNON.Body({mass:1,shape:new CANNON.Sphere(r),position:new CANNON.Vec3((Math.random()-.5)*3,5,0)});world.addBody(body);objects.push({mesh,body});return body}
 let clock=new THREE.Clock(),running=true;function resize(){let w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||400;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}window.addEventListener('resize',resize);resize();
 function loop(){if(!running)return;requestAnimationFrame(loop);world.step(1/60,Math.min(clock.getDelta(),.05),3);objects.forEach(o=>{o.mesh.position.copy(o.body.position);o.mesh.quaternion.copy(o.body.quaternion)});renderer.render(scene,camera)}loop();
 return {box,ball,clear(){objects.forEach(o=>{scene.remove(o.mesh);world.removeBody(o.body)});objects=[]},dispose(){running=false;renderer.dispose()}};
}
export function startWorld(canvas){const p=startPhysics(canvas);for(let i=0;i<15;i++)p.ball();return p}
