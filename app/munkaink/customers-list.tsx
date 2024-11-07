import Link from 'next/link'
import Image from 'next/image'
import CustomerImg01 from '@/public/images/referenciak/finematic.hu.webp'
import CustomerBg01 from '@/public/images/customer-bg-01.webp'
import CustomerImg02 from '@/public/images/referenciak/tetofedo-lajos.hu.webp'
import CustomerBg02 from '@/public/images/customer-bg-02.webp'
import CustomerImg03 from '@/public/images/referenciak/kerteszerd.hu.webp'
import CustomerBg03 from '@/public/images/customer-bg-03.webp'
import CustomerImg04 from '@/public/images/referenciak/kavefa.hu.webp'
import CustomerBg04 from '@/public/images/customer-bg-04.webp'
import CustomerImg05 from '@/public/images/referenciak/fixteto.hu.webp'
import CustomerBg05 from '@/public/images/customer-bg-05.webp'
import CustomerImg06 from '@/public/images/referenciak/drczettelekatalin.hu.webp'
import CustomerBg06 from '@/public/images/customer-bg-06.webp'
import CustomerImg07 from '@/public/images/referenciak/botond-tetofedo.hu.webp'
import CustomerBg07 from '@/public/images/customer-bg-07.webp'
import CustomerImg08 from '@/public/images/referenciak/bodok-tetofedo-mester.hu.webp'
import CustomerBg08 from '@/public/images/customer-bg-08.webp'
import CustomerImg09 from '@/public/images/referenciak/precizkemenykft.hu.webp'
import CustomerBg09 from '@/public/images/customer-bg-09.webp'
import CustomerImg10 from '@/public/images/referenciak/soforborze.hu.webp'
import CustomerBg10 from '@/public/images/customer-bg-10.webp'
import CustomerAvatar01 from '@/public/images/customer-avatar-01.jpg'
import CustomerAvatar02 from '@/public/images/customer-avatar-02.jpg'
import Particles from '@/app/components/UI/Particles'
import Highlighter, { HighlighterItem02 } from '@/app/components/highlighter'

export default function CustomersList() {

  const items = [
    {
      name: 'Customer name',
      img: CustomerImg01,
      bg: CustomerBg01,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg02,
      bg: CustomerBg02,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg03,
      bg: CustomerBg03,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg04,
      bg: CustomerBg04,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg05,
      bg: CustomerBg05,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg06,
      bg: CustomerBg06,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg07,
      bg: CustomerBg07,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg08,
      bg: CustomerBg08,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg09,
      bg: CustomerBg09,
      link: '#',
    },
    {
      name: 'Customer name',
      img: CustomerImg10,
      bg: CustomerBg10,
      link: '#',
    },
  ]

  return (
  <div className="max-w-[352px] mx-auto sm:max-w-[728px] lg:max-w-none pb-12 md:pb-20 w-[1100px]">
    <Highlighter className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 group [&_*:nth-child(n+5):not(:nth-child(n+12))]:order-1 [&_*:nth-child(n+10):not(:nth-child(n+11))]:!order-2">

      {items.map((item, index) => (
        <div key={index}>
          <Link href={item.link}>
            <HighlighterItem02>
              <div className="relative h-full bg-green-900 rounded-[inherit] z-20 overflow-hidden">
                {/* Particles animation */}
                <Particles className="absolute inset-0 -z-1" quantity={8} />
                <div className="flex items-center justify-center">
                  <Image className="w-full h-full aspect-video object-cover" src={item.bg} width={352} height={198} alt="Customer Background" aria-hidden="true" />
                  <Image className="absolute" src={item.img} alt={item.name} />
                </div>
              </div>
            </HighlighterItem02>
          </Link>
        </div>
      ))}

      {/* Testimonial #01 */}
      <div className="flex flex-col items-center justify-center text-center p-4">
        <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-200/60 via-green-600 to-green-200/60 pb-3">
          <span className="line-clamp-6">
          Egyedi igényekre szabott, skálázható és biztonságos webes alkalmazásokat fejlesztünk, amelyeket ügyfeleink hosszú távon értékelnek. Büszkék vagyunk az elégedett partnereinkre, akik digitális jelenlétüket velünk építették.
          </span>
        </p>  
      </div>
      {/* Testimonial #02 */}
      <div className="flex flex-col items-center justify-center text-center p-4">
        <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-green-200/60 via-green-500 to-green-200/60 pb-3">
          <span className="line-clamp-6">
          Webfejlesztő csapatunk olyan megoldásokat hoz létre, amelyek ügyfeleink üzleti céljait támogatják, a felhasználói élményt helyezve előtérbe. Referenciáink között megtalálható a modern technológia, a funkcionalitás és a dizájn tökéletes harmóniája együttesen.
          </span>
        </p>
      </div>

    </Highlighter>
  </div>
  )
}
