import { css } from "@/styles/css"
import Link from "next/link"

export const Nav = () => {
  const navItems = [
    {
      category: 'emscripten',
      items: [
        {
          name: 'main thread',
          href: '/emscripten',
        },
        {
          name: 'worker',
          href: '/emscripten/worker',
        }
      ]
    },
    {
      category: 'rust',
      items: [
        {
          name: 'worker',
          href: '/wasm-pack',
        }
      ]
    },
  ]
  return <div className={css({ position: 'fixed', top: '0', left: '0', 
    display: 'flex', gap: 8, alignItems: 'center', px: 6, py: 2, backgroundColor: 'gray.200', zIndex: 99999, fontSize: 'xs' })}>
    {
      navItems.map((item) => {
        return <div key={item.category}>
          <b>{item.category}</b>
        <ul className={css({ display: 'flex', gap: '2' })}>
          {item.items.map(navItem => <li key={navItem.name} className={css({ listStyle: 'inside' })}>
            <Link className={css({ _hover: { textDecoration: 'underline' }, ml: -2 })} href={navItem.href}>{navItem.name}</Link>
          </li>)}
        </ul>
      </div>
      })
    }
  </div>
}
