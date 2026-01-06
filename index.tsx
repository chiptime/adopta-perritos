import React, { useState, useEffect } from 'react';
import { Heart, Search, Filter, MapPin, ChevronLeft, Info, Share2, Phone, Mail, CheckCircle, PawPrint, Menu, X, Camera } from 'lucide-react';

// --- MOCK DATA ---
const dogs = [
  {
    id: 1,
    name: "Melody",
    breed: "Podenco Mix",
    age: "2 años",
    gender: "Hembra",
    size: "Mediano",
    location: "Madrid",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1633502808013-39f1c7d678d7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1596707449079-661266c1f7a0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1553882951-9c3dab4a50cb?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Sociable", "Activa", "Cariñosa"],
    description: "Melody es una perrita llena de vida. Fue rescatada de una situación difícil pero no ha perdido la fe en los humanos. Le encanta correr por el campo y jugar con otros perros. Busca una familia activa que la lleve de aventuras.",
    health: ["Vacunada", "Esterilizada", "Chip", "Desparasitada"]
  },
  {
    id: 2,
    name: "Bruno",
    breed: "Mestizo",
    age: "5 meses",
    gender: "Macho",
    size: "Pequeño (crecerá)",
    location: "Madrid",
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588022274152-8d76e33db383?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Cachorro", "Juguetón", "Ideal pisos"],
    description: "Bruno es un cachorro adorable que está descubriendo el mundo. Es un poco tímido al principio, pero en cuanto coge confianza es puro amor. Ideal para una familia con paciencia para educar a un cachorro.",
    health: ["Vacunada (1a dosis)", "Chip", "Desparasitada"]
  },
  {
    id: 3,
    name: "Luna",
    breed: "Galgo",
    age: "3 años",
    gender: "Hembra",
    size: "Grande",
    location: "Toledo",
    img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1617267443187-5781a707127b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1529927066849-79b791a69825?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Tranquila", "Sofá lover", "Noble"],
    description: "Luna hace honor a la fama de los galgos: es una estatua de tranquilidad en casa. Le encanta dormir en el sofá y recibir caricias suaves. Pasea perfectamente con correa y se lleva bien con gatos.",
    health: ["Vacunada", "Esterilizada", "Chip", "Test Leishmania Negativo"]
  },
  {
    id: 4,
    name: "Rocky",
    breed: "Boxer Mix",
    age: "4 años",
    gender: "Macho",
    size: "Mediano/Grande",
    location: "Madrid",
    img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1555661330-90ac02629076?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505628346881-b72e278045d4?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Protector", "Fiel", "Energía Alta"],
    description: "Rocky es pura potencia y corazón. Necesita alguien con experiencia en perros fuertes, pero es un pedazo de pan con las personas. Le encantan los juegos de olfato.",
    health: ["Vacunada", "Castrado", "Chip"]
  },
  {
    id: 5,
    name: "Coco",
    breed: "Teckel",
    age: "1 año",
    gender: "Macho",
    size: "Pequeño",
    location: "Segovia",
    img: "https://images.unsplash.com/photo-1612144431180-2d67277955dd?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1659957380962-d9657c65363e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1628109403166-4c7497d3969e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1520087619250-584c0dd35130?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Simpático", "Curioso", "Familiar"],
    description: "Coco es un pequeño explorador. No para quieto y le encanta investigar cada rincón del parque. Se lleva genial con niños y es el alma de la fiesta.",
    health: ["Vacunada", "Castrado", "Chip"]
  },
  {
    id: 6,
    name: "Nala",
    breed: "Pastor Alemán",
    age: "6 años",
    gender: "Hembra",
    size: "Grande",
    location: "Madrid",
    img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=1200",
    gallery: [
      "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1612536050360-1e59265f2a1b?auto=format&fit=crop&q=80&w=800"
    ],
    tags: ["Inteligente", "Leal", "Obediente"],
    description: "Nala es una perra 10. Conoce todas las órdenes básicas, pasea sin tirar y es muy equilibrada. Su dueño falleció y busca una segunda oportunidad para demostrar su lealtad infinita.",
    health: ["Vacunada", "Esterilizada", "Chip"]
  }
];

// --- COMPONENTS ---

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-zinc-100 text-zinc-700",
    primary: "bg-purple-100 text-purple-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[variant]} border border-transparent`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "primary", className = "", icon: Icon, onClick, fullWidth }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/30",
    secondary: "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm",
    ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100",
    outline: "bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      onClick={onClick}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Navbar = ({ onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
            <div className="bg-purple-600 p-2 rounded-xl text-white">
              <PawPrint size={24} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              HuellaFeliz
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onViewChange('home')} className="text-zinc-600 hover:text-purple-600 font-medium transition-colors">Inicio</button>
            <button className="text-zinc-600 hover:text-purple-600 font-medium transition-colors">Adopta</button>
            <button className="text-zinc-600 hover:text-purple-600 font-medium transition-colors">Cómo ayudar</button>
            <button className="text-zinc-600 hover:text-purple-600 font-medium transition-colors">Blog</button>
            <Button variant="primary" className="!px-5 !py-2 !rounded-xl text-sm">Donar ahora</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-zinc-100 p-4 space-y-4">
          <button onClick={() => onViewChange('home')} className="block w-full text-left p-2 text-zinc-600 font-medium">Inicio</button>
          <button className="block w-full text-left p-2 text-zinc-600 font-medium">Adopta</button>
          <button className="block w-full text-left p-2 text-zinc-600 font-medium">Donar</button>
        </div>
      )}
    </nav>
  );
};

// --- VIEWS ---

const LandingView = ({ onSelectDog }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-zinc-50 pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <Badge variant="primary">50+ peludos esperando un hogar</Badge>
          <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">
            Encuentra a tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              compañero de vida
            </span>
          </h1>
          <p className="mt-6 text-xl text-zinc-600 max-w-2xl mx-auto">
            La adopción no solo cambia la vida del animal, también cambia la tuya.
            Descubre el amor incondicional en HuellaFeliz.
          </p>

          {/* Search/Filter Bar - HeroUI Style Input Group */}
          <div className="mt-10 w-full max-w-3xl bg-white p-2 rounded-3xl shadow-xl shadow-purple-500/10 border border-zinc-100 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por raza, nombre..."
                className="w-full h-12 pl-12 pr-4 bg-transparent rounded-2xl focus:bg-zinc-50 focus:outline-none text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
            <div className="h-12 w-px bg-zinc-200 hidden md:block mx-2"></div>
            <div className="flex gap-2">
                <button className="h-12 px-6 flex items-center gap-2 text-zinc-600 hover:bg-zinc-50 rounded-2xl font-medium transition-colors">
                    <Filter size={18} /> Filtros
                </button>
                <Button variant="primary" className="!h-12 !px-8 !rounded-2xl">Buscar</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900">Últimos rescates</h2>
            <p className="text-zinc-500 mt-2">Estos pequeños acaban de llegar y buscan familia.</p>
          </div>
          <button className="hidden md:flex items-center text-purple-600 font-semibold hover:text-purple-700">
            Ver todos <ChevronLeft className="rotate-180 ml-1" size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dogs.map((dog) => (
            <div
              key={dog.id}
              className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer"
              onClick={() => onSelectDog(dog)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dog.img}
                  alt={dog.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                  <Heart size={20} />
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                    {dog.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900">{dog.name}</h3>
                    <p className="text-zinc-500 text-sm font-medium">{dog.breed}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-zinc-900 font-bold">{dog.age}</p>
                    <p className="text-zinc-400 text-xs">{dog.gender}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-zinc-400 text-sm mb-6">
                  <MapPin size={16} />
                  {dog.location}
                </div>

                <Button variant="secondary" fullWidth className="group-hover:bg-purple-50 group-hover:text-purple-700 group-hover:border-purple-200">
                  Conocer a {dog.name}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DetailView = ({ dog, onBack }) => {
  const [activeImg, setActiveImg] = useState(dog.img);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImg(dog.img);
  }, [dog]);

  return (
    <div className="animate-in slide-in-from-bottom-8 duration-500 min-h-screen bg-zinc-50 pb-20">
      {/* Header Image */}
      <div className="relative h-[50vh] lg:h-[60vh] w-full bg-zinc-900">
        <img src={activeImg} alt={dog.name} className="w-full h-full object-cover opacity-90 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent"></div>

        <div className="absolute top-24 left-4 md:left-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
          >
            <ChevronLeft size={20} /> Volver
          </button>
        </div>
      </div>

      {/* Content Container - Overlapping the image like a card */}
      <div className="relative max-w-5xl mx-auto -mt-32 px-4 sm:px-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-zinc-200 border border-zinc-100 p-6 md:p-12">

          {/* Main Info Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-zinc-100 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900">{dog.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${dog.gender === 'Hembra' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                  {dog.gender}
                </span>
              </div>
              <div className="flex items-center gap-4 text-zinc-500">
                <span className="flex items-center gap-1"><MapPin size={18} /> {dog.location}</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                <span>ID: #{dog.id}8294</span>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button className="p-3 rounded-2xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors">
                <Share2 size={24} />
              </button>
              <button className="p-3 rounded-2xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-colors">
                <Heart size={24} />
              </button>
              <Button variant="primary" className="flex-1 md:flex-none">
                Solicitar Adopción
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column: Stats & Description */}
            <div className="lg:col-span-2 space-y-10">

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-center">
                    <p className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">Raza</p>
                    <p className="text-purple-900 font-semibold">{dog.breed}</p>
                </div>
                <div className="p-4 rounded-2xl bg-orange-50 border border-orange-100 text-center">
                    <p className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">Edad</p>
                    <p className="text-orange-900 font-semibold">{dog.age}</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-center">
                    <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Tamaño</p>
                    <p className="text-blue-900 font-semibold">{dog.size}</p>
                </div>
                <div className="p-4 rounded-2xl bg-green-50 border border-green-100 text-center">
                    <p className="text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Salud</p>
                    <p className="text-green-900 font-semibold">Revisado</p>
                </div>
              </div>

              {/* Story */}
              <div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <Info size={24} className="text-purple-600" />
                  La historia de {dog.name}
                </h3>
                <p className="text-zinc-600 text-lg leading-relaxed whitespace-pre-line">
                  {dog.description}
                  <br/><br/>
                  Es un perro que necesita tiempo para adaptarse, pero una vez lo hace, es inseparable. Buscamos una familia que entienda sus necesidades y le dé el amor que se merece.
                </p>
              </div>

              {/* Photo Gallery - NEW SECTION */}
              {dog.gallery && dog.gallery.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                    <Camera size={24} className="text-purple-600" />
                    Galería de Fotos
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {/* Main image thumbnail */}
                    <div
                        className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 ${activeImg === dog.img ? 'border-purple-600' : 'border-transparent'}`}
                        onClick={() => setActiveImg(dog.img)}
                    >
                      <img src={dog.img} alt="Main" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    {/* Gallery images */}
                    {dog.gallery.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 ${activeImg === imgUrl ? 'border-purple-600' : 'border-transparent'}`}
                        onClick={() => setActiveImg(imgUrl)}
                      >
                        <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags/Personality */}
              <div>
                <h3 className="text-lg font-bold text-zinc-900 mb-4">Personalidad</h3>
                <div className="flex flex-wrap gap-2">
                  {dog.tags.map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-600 font-medium border border-zinc-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Health Info */}
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
                <h3 className="text-lg font-bold text-zinc-900 mb-4">Estado Veterinario</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dog.health.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-zinc-600">
                      <CheckCircle size={18} className="text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Column: Sticky Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-zinc-100">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">¿Te interesa adoptar?</h3>
                  <p className="text-zinc-500 text-sm mb-6">Contacta con la protectora para iniciar el proceso de adopción.</p>

                  <div className="space-y-3">
                    <Button fullWidth variant="outline" icon={Mail} className="justify-start pl-6">
                      Enviar Email
                    </Button>
                    <Button fullWidth variant="outline" icon={Phone} className="justify-start pl-6">
                      Llamar al refugio
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-zinc-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <PawPrint size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-zinc-900">La Huella feliz</p>
                            <p className="text-xs text-zinc-500">Madrid, España</p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-600 p-6 rounded-3xl shadow-xl shadow-purple-900/20 text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-xl"></div>
                   <h3 className="text-lg font-bold mb-2 relative z-10">Apadrina a {dog.name}</h3>
                   <p className="text-purple-100 text-sm mb-4 relative z-10">
                     Si no puedes adoptar, ayúdanos con sus gastos veterinarios y alimentación.
                   </p>
                   <button className="w-full py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors relative z-10">
                     Apadrinar ahora
                   </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  const [view, setView] = useState('home'); // 'home' or 'detail'
  const [selectedDog, setSelectedDog] = useState(null);

  const handleSelectDog = (dog) => {
    setSelectedDog(dog);
    setView('detail');
  };

  const handleBack = () => {
    setView('home');
    setSelectedDog(null);
  };

  return (
    <div className="min-h-screen font-sans bg-zinc-50 text-zinc-900 selection:bg-purple-100 selection:text-purple-900">
      <Navbar onViewChange={(v) => {
        if (v === 'home') handleBack();
      }} />

      {view === 'home' ? (
        <LandingView onSelectDog={handleSelectDog} />
      ) : (
        selectedDog && <DetailView dog={selectedDog} onBack={handleBack} />
      )}

      {/* Footer Simple */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-zinc-400 text-sm">
          <p>© 2024 HuellaFeliz. Diseño estilo HeroUI generado para demostración.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
