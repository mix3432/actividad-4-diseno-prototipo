import { NavLink } from 'react-router-dom';
import { ShoppingCart, List } from 'lucide-react';

function Card({ icon: Icon, title, link, label }) {
  return (
    <div
      className="
        bg-indigo-50/60 hover:bg-indigo-50
        rounded-2xl w-72 p-8
        flex flex-col gap-6
        transition-shadow hover:shadow-md
      "
    >
      {/* icono redondo */}
      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
        <Icon size={18} className="text-indigo-600" />
      </div>

      <h3 className="font-semibold text-lg">{title}</h3>

      <NavLink
        to={link}
        className="
          self-start
          bg-indigo-600 hover:bg-indigo-700
          text-white text-sm font-medium
          px-4 py-1.5 rounded
          transition-colors
        "
      >
        {label}
      </NavLink>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Bienvenido</h1>
        <p className="text-sm text-gray-600">Selecciona una opción</p>
      </div>

      <div className="flex flex-wrap gap-8">
        <Card
          icon={ShoppingCart}
          title="Realizar Venta"
          link="/venta"
          label="Ir a Venta"
        />

        <Card
          icon={List}
          title="Ver Historial"
          link="/historial"
          label="Ver Historial"
        />
      </div>
    </div>
  );
}
