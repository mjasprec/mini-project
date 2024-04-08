import Link from 'next/link';

const navItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Marketplace',
    url: '/marketplace',
  },
  {
    title: 'NFT',
    url: '/nft',
  },
  {
    title: 'Wallet',
    url: '/wallet',
  },
  {
    title: 'Profile',
    url: '/profile',
  },
];

function NavItems({ activeItem = 0 }: { activeItem?: number }) {
  return (
    <div>
      {navItems.map((navItem, idx) => (
        <Link
          key={navItem.title}
          href={navItem.url}
          className={`px-5 text[18px] font-Poppins font-[500] cursor-pointer ${
            activeItem === idx && 'text-[#37b668]'
          }`}
        >
          {navItem.title}
        </Link>
      ))}
    </div>
  );
}

export default NavItems;
