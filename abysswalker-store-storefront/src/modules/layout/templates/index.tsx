import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

const Layout: React.FC<{
  children: React.ReactNode
  countryCode?: string
}> = ({ children, countryCode = "" }) => {
  return (
    <div>
      <Nav countryCode={countryCode} />
      <main className="relative">{children}</main>
      <Footer countryCode={countryCode} />
    </div>
  )
}

export default Layout
