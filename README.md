# OctopusVR integrado (projeto web/PWA)
Este pacote integra interface, janelas desktop, perfil local, módulos 3D com Three.js + Cannon-es, rastreamento MediaPipe, câmera Reality, player local, catálogo de pacotes web, pet, futebol de toque e configurações.

## Abrir
Hospede a pasta em HTTPS (GitHub Pages serve) e abra `index.html`. Para testar localmente, use um servidor HTTP; câmera exige HTTPS ou localhost. MediaPipe/Three.js carregam de CDN e exigem internet na primeira inicialização. Service Worker cacheia o shell, mas não baixa automaticamente os modelos MediaPipe/CDN.

## Recursos realmente implementados
- Perfil local persistido (localStorage), sem Firebase/conta online.
- Desktop: janelas arrastáveis, minimizar ao dock, fechar.
- Hand Studio: MediaPipe Hand Landmarker real, 2 mãos, 21 landmarks e visualização skeletal/aura/glove/points.
- PaintVR/Sandbox/Playground: Three.js + Cannon-es, gravidade e colisões caixa/esfera/chão.
- Reality: feed da câmera e overlays decorativos; não é AR espacial com âncoras.
- Cinema/Music: reproduz arquivos escolhidos pelo usuário.
- Shop/Hub: lê pacotes `.octpkg` JSON `{ "name":"Meu app", "html":"<h1>Olá</h1>" }`, salva localmente e abre em iframe sandbox.
- Pet, avatar, notas locais, jogo simples de chute por toque, mundo procedural 3D.
- PWA manifest e cache do shell.

## Limitações honestas / não implementado
- **Não é APK**: Capacitor/Android Studio e build assinado ainda são necessários.
- AR com âncoras persistentes/oclusão/colisão do mundo real não implementada; câmera + overlays não é AR completa.
- Rastreamento de pés confiável não implementado; futebol é jogo de toque.
- Joy-Con não conectado.
- Multiplayer/social online não implementado (foi adiado).
- Instalação de APK externa depende do instalador Android e confirmação/autorizações do usuário; o catálogo aceita apenas HTML sandboxado.
- Physics3D é uma base real, não engine VR com headset/6DoF.
- MediaPipe e módulos importados por CDN necessitam internet; offline é parcial após cache.
