export interface NavItem {
  id: string
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { id: "inicio",        label: "Início",        href: "#" },
  { id: "historias",     label: "Histórias",     href: "#historias" },
  { id: "projeto",       label: "Projeto",       href: "#projeto" },
  { id: "contato",       label: "Solução",       href: "#contato" },
  { id: "linha-do-tempo", label: "Linha do tempo", href: "#linha-do-tempo" },
  { id: "galeria",       label: "Galeria",       href: "#galeria" },
]
