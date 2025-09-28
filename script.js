const localIpEl = document.getElementById("local-ip");
const publicIpEl = document.getElementById("public-ip");
const locationEl = document.getElementById("location");
const enterBtn = document.getElementById("enterBtn");
const bgVideo = document.getElementById("bgVideo");

function playVideo() {
  if(bgVideo.paused) {
    bgVideo.play().catch(() => console.log("Autoplay bloqueado."));
  }
}
window.addEventListener('load', playVideo);
document.body.addEventListener('click', playVideo);

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    publicIpEl.textContent = "IP Público: " + data.ip;
    return fetch("https://ipinfo.io/" + data.ip + "/json?token=YOUR_TOKEN_HERE");
  })
  .then(res => res.json())
  .then(info => {
    if(info.city){
      locationEl.textContent = "Localização: " + info.city + ", " + info.region + " - " + info.country;
    } else {
      locationEl.textContent = "Localização: Indisponível";
    }
  })
  .catch(() => {
    publicIpEl.textContent = "IP Público: Não detectado";
    locationEl.textContent = "Localização: Indisponível";
  });

function getLocalIP(callback) {
  let pc = new RTCPeerConnection({iceServers:[]});
  pc.createDataChannel("");
  pc.createOffer().then(offer => pc.setLocalDescription(offer));
  pc.onicecandidate = event => {
    if(event && event.candidate){
      let candidate = event.candidate.candidate;
      let ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
      if(ipMatch){
        callback(ipMatch[1]);
        pc.close();
      }
    }
  };
}
getLocalIP(ip => localIpEl.textContent = "IP Local: " + ip);

enterBtn.addEventListener("click", () => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("mainContent").style.display = "flex";
  document.body.style.overflow = "auto";
});

const services = {
  pwpush: { title:"Password Pusher", desc:"Compartilhamento seguro de senhas temporárias.", url:"https://eu.pwpush.com/" },
  databreach: { title:"Data Breach", desc:"Verifique exposições de dados online.", url:"https://databreach.com/" },
  surveillance: { title:"Surveillance Watch", desc:"Monitoramento de vigilância e rastreamento.", url:"https://www.surveillancewatch.io/" },
  browserscan: { title:"Browser Scan", desc:"Analise dados coletados pelo seu navegador.", url:"https://www.browserscan.net/#google_vignette" },
  privacynet: { title:"Privacy Analyzer", desc:"Ferramenta para verificar rastreamento online.", url:"https://privacy.net/analyzer/" },
  hibp: { title:"Have I Been Pwned", desc:"Verifique se seus dados foram comprometidos.", url:"https://haveibeenpwned.com/" },
  hispy: { title:"HiSpy", desc:"Rastreamento e análise de ameaças digitais.", url:"https://hispy.io/#lp-video" },
  criminalip: { title:"Criminal IP", desc:"Plataforma de inteligência de ameaças cibernéticas.", url:"https://www.criminalip.io/" },
  epieos: { title:"Epieos", desc:"Ferramenta OSINT para pesquisa de e-mails.", url:"https://epieos.com/" },
  osintindustries: { title:"OSINT Industries", desc:"Artigo sobre pesquisa reversa de e-mails.", url:"https://www.osint.industries/post/reverse-email-lookup-the-basics" },
  osintframework: { title:"OSINT Framework", desc:"Framework de ferramentas de OSINT.", url:"https://osintframework.com/" },
  maps: { title:"Google Maps", desc:"Exemplo de coordenada em mapa.", url:"https://www.google.com/maps/@-22.4874986,-44.0484718,15z/data=!4m2!24m1!9e1?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D" },
  geospy: { title:"GeoSpy", desc:"Serviço de localização geográfica.", url:"https://geospy.net/en/geospy" },
  aispy: { title:"AI Spy", desc:"Ferramenta OSINT com IA.", url:"https://app.ai-spy.xyz/" },
  fingerprint: { title:"Fingerprint", desc:"Identificação única de navegadores.", url:"https://dashboard.fingerprint.com/onboarding" },
  mxtoolbox: { title:"MXToolbox SPF", desc:"Verificação de registros SPF.", url:"https://mxtoolbox.com/spf.aspx" },
  googleSupport: { title:"Google Support", desc:"Documentação de suporte do Google.", url:"https://support.google.com/a/answer/33786?hl=es" },
  cachesleuth: { title:"Cache Sleuth", desc:"Ferramenta de análise de cache.", url:"https://www.cachesleuth.com/multidecoder/" },
  cipher: { title:"Cipher Identifier", desc:"Identificação de cifras criptográficas.", url:"https://www.boxentriq.com/code-breaking/cipher-identifier" },
  hackersec: { title:"HackerSec", desc:"Lista de ferramentas hackers.", url:"https://hackersec.com/melhores-ferramentas-hacker/" },
  mediumEmail: { title:"Email OSINT", desc:"Guia de OSINT para e-mails.", url:"https://medium.com/@ninamaelainine/email-osint-simplified-proven-methods-for-success-5077127cadf6" },
  mapsSupport: { title:"Google Maps Support", desc:"Ajuda sobre coordenadas e mapas.", url:"https://support.google.com/maps/answer/6258979?hl=en&co=GENIE.Platform%3DAndroid" },
  geospyai: { title:"GeoSpy AI", desc:"Serviço geográfico com IA.", url:"https://geospy.ai/" },
  piwik: { title:"Piwik PRO", desc:"Plataforma de análise de dados e privacidade.", url:"https://piwik.pro/web-analytics/" },
  githubExplore: { title:"GitHub Explore", desc:"Explore projetos no GitHub.", url:"https://github.com/explore" },
  githubCriminalip: { title:"GitHub CriminalIP", desc:"Repositórios da CriminalIP.", url:"https://github.com/orgs/criminalip/repositories" },
  seclists: { title:"SecLists", desc:"Coleção de listas para segurança e testes.", url:"https://github.com/danielmiessler/SecLists" },
  antispam: { title:"Antispam BR", desc:"Mapa de tráfego de spam no Brasil.", url:"https://antispam.br/mapa/" }
};

function openPopup(serviceKey){
  const service = services[serviceKey];
  document.getElementById('popupTitle').innerText = service.title;
  document.getElementById('popupDesc').innerText = service.desc;
  document.getElementById('popupLink').onclick = () => { window.open(service.url, "_blank"); };
  document.getElementById('popupOverlay').style.display = "flex";
}

function closePopup(){
  document.getElementById('popupOverlay').style.display = "none";
}
