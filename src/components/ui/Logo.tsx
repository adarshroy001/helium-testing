import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center">
      <h1 className="text-[#033129] font-logo sm:font-semibold text-xl sm:text-2xl ">
        HELIUM
      </h1>
    </Link>
  )
}

export default Logo