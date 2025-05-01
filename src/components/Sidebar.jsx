import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, ShoppingCart, FileText, AlertCircle,
  Database, CheckCircle2, LogIn
} from 'lucide-react';

const links = [
  { to:'/',             icon:Home           },
  { to:'/venta',        icon:ShoppingCart   },
  { to:'/historial',    icon:FileText       },
  { to:'/errores',      icon:AlertCircle    },
  { to:'/inventario',   icon:Database       },
  { to:'/confirmaciones',icon:CheckCircle2  },
];

export default function Sidebar() {
  return (
    <nav className="w-20 bg-white border-r flex flex-col items-center py-6">
      {links.map((l,i)=>(
        <NavLink
          key={i} to={l.to} end={l.to==='/'}
          className={({isActive})=>
            `mb-6 p-2 rounded-lg text-gray-500 hover:text-indigo-600 ${
              isActive?'bg-indigo-100 text-indigo-600':''
            }`
          }
        >
          <l.icon size={24}/>
        </NavLink>
      ))}
      <NavLink to="/login" className="mt-auto p-2 text-gray-500 hover:text-indigo-600">
        <LogIn size={24} />
      </NavLink>
      <img src="/avatar.png" alt="User" className="h-10 w-10 rounded-full mt-4"/>
    </nav>
  );
}
