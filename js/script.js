
/* =========================
CARROSSEL
========================= */

const carrossel =
document.getElementById('carrossel');

const btnAnterior =
document.getElementById('btnAnterior');

const btnProximo =
document.getElementById('btnProximo');

const indicadoresContainer =
document.getElementById('indicadores');

const spanAtual =
document.getElementById('atual');

const spanTotal =
document.getElementById('total');

const obras =
document.querySelectorAll('.obra-card');

let indiceAtual = 0;

const totalObras = obras.length;

spanTotal.textContent = totalObras;

for(let i = 0; i < totalObras; i++){

    const indicador =
    document.createElement('div');

    indicador.className = 'indicador';

    if(i === 0){
        indicador.classList.add('ativo');
    }

    indicador.addEventListener(
    'click',
    () => irPara(i));

    indicadoresContainer.appendChild(indicador);
}

const indicadores =
document.querySelectorAll('.indicador');

function atualizarCarrossel(){

    const deslocamento =
    -indiceAtual * 100;

    carrossel.style.transform =
    `translateX(${deslocamento}%)`;

    indicadores.forEach((ind, i)=>{

        ind.classList.toggle(
        'ativo',
        i === indiceAtual
        );

    });

    spanAtual.textContent =
    indiceAtual + 1;
}

function proximo(){

    indiceAtual =
    (indiceAtual + 1) % totalObras;

    atualizarCarrossel();
}

function anterior(){

    indiceAtual =
    (indiceAtual - 1 + totalObras) % totalObras;

    atualizarCarrossel();
}

function irPara(indice){

    indiceAtual = indice;

    atualizarCarrossel();
}

btnProximo.addEventListener(
'click',
proximo);

btnAnterior.addEventListener(
'click',
anterior);

/* =========================
PANORAMA
========================= */

let viewer =
pannellum.viewer('panorama', {

    type:'equirectangular',

    panorama:
    'https://i.postimg.cc/mk9g0h6g/Chat-GPT-Image-16-de-mai-de-2026-23-03-31.png',

    autoLoad:true,
    compass:true,
    friction:0.05

});

const botoesPanorama =
document.querySelectorAll('.panorama-btn');

botoesPanorama.forEach(botao => {

    botao.addEventListener(
    'click',
    ()=>{

        botoesPanorama.forEach(btn => {

            btn.classList.remove('active');

        });

        botao.classList.add('active');

        const novaImagem =
        botao.dataset.panorama;

        viewer.destroy();

        viewer =
        pannellum.viewer('panorama', {

            type:'equirectangular',

            panorama:novaImagem,

            autoLoad:true,
            compass:true,
            friction:0.05

        });

    });

});

/* =========================
VELOCIDADE DOS VÍDEOS
========================= */

const videoPrincipal =
document.getElementById('videoPrincipal');

if(videoPrincipal){

    videoPrincipal.playbackRate = 1.25;

}

const videoCreditos =
document.getElementById('videoCreditos');

if(videoCreditos){

    videoCreditos.playbackRate = 2.0;

}

/* =========================
LIVRO 3D
========================= */

function criarLivro3D(){

    const container =
    document.getElementById("book3d");

    const scene =
    new THREE.Scene();

    scene.background =
    new THREE.Color(0x0f172a);

    const camera =
    new THREE.PerspectiveCamera(
        75,
        container.clientWidth /
        container.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 3.5;

    const renderer =
    new THREE.WebGLRenderer({
        antialias:true
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(
        renderer.domElement
    );

    const controls =
    new THREE.OrbitControls(
        camera,
        renderer.domElement
    );

    controls.enableZoom = false;

    const geometry =
    new THREE.BoxGeometry(
        1.6,
        2.3,
        0.18
    );

    const loader =
    new THREE.TextureLoader();

    const lateral =
    loader.load(
    "https://i.postimg.cc/JzTX5Zn9/paginas.jpg");

    const capa =
    loader.load(
    "https://i.postimg.cc/wMdgm4dy/IMG-20260406-WA0005-(1).jpg");

    const contracapa =
    loader.load(
    "https://i.postimg.cc/g2BpD2Wj/contrcapa.jpg");

    const linha =
    loader.load(
    "https://i.postimg.cc/HLxxYNp8/linha.jpg");

    const lateralTexture =
    loader.load(
    "https://i.postimg.cc/JzTX5Zn9/paginas.jpg");

    lateralTexture.center.set(0.5, 0.5);

    lateralTexture.rotation =
    Math.PI / 2;

    const materials = [

        new THREE.MeshStandardMaterial({
            map:lateralTexture
        }),

        new THREE.MeshStandardMaterial({
            map:linha
        }),

        new THREE.MeshStandardMaterial({
            map:lateral
        }),

        new THREE.MeshStandardMaterial({
            map:lateral
        }),

        new THREE.MeshStandardMaterial({
            map:capa
        }),

        new THREE.MeshStandardMaterial({
            map:contracapa
        })

    ];

    const book =
    new THREE.Mesh(
        geometry,
        materials
    );

    scene.add(book);

    const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.8
    );

    scene.add(ambientLight);

    const pointLight =
    new THREE.PointLight(
        0xffffff,
        1
    );

    pointLight.position.set(
        5,
        5,
        5
    );

    scene.add(pointLight);

    function animate(){

        requestAnimationFrame(animate);

        book.rotation.y += 0.005;

        controls.update();

        renderer.render(
            scene,
            camera
        );

    }

    window.addEventListener(
    'resize',
    () => {

        camera.aspect =
        container.clientWidth /
        container.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

    });

    animate();
}

criarLivro3D();



