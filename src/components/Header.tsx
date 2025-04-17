import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              VALORANT Stats
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/agents" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Agents
            </Link>
            <Link 
              href="/teams" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Teams
            </Link>
            <Link 
              href="/maps" 
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Maps
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 