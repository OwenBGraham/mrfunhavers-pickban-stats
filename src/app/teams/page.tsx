'use client';

import { TeamCard } from "../../components/TeamCard";
import { BackButton } from "@/components/BackButton";
import { teamStats } from "@/services/tournament/tournamentData";
import { useState } from "react";

const TEAMS_PER_PAGE = 6;

export default function TeamsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Convert teamStats to array and sort by team name
  const teams = Object.entries(teamStats)
    .map(([teamName, stats]) => ({
      teamName,
      stats: {
        agentPicks: stats.agentPicks,
        agentBans: stats.agentBans
      }
    }))
    .sort((a, b) => a.teamName.localeCompare(b.teamName));

  // Filter and sort teams based on search term
  const filteredTeams = teams
    .filter(team => team.teamName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aStartsWith = a.teamName.toLowerCase().startsWith(searchTerm.toLowerCase());
      const bStartsWith = b.teamName.toLowerCase().startsWith(searchTerm.toLowerCase());
      
      // If one starts with the search term and the other doesn't, prioritize the one that does
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      
      // If both start with the search term or neither does, sort alphabetically
      return a.teamName.localeCompare(b.teamName);
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTeams.length / TEAMS_PER_PAGE);
  const startIndex = (currentPage - 1) * TEAMS_PER_PAGE;
  const endIndex = startIndex + TEAMS_PER_PAGE;
  const currentTeams = filteredTeams.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Show 5 page numbers at a time

    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the start
      if (currentPage <= 2) {
        end = 4;
      }
      // Adjust if we're near the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pageNumbers.push('...');
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pageNumbers.push('...');
      }

      // Always show last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton />
          </div>
          <h1 className="text-4xl font-bold mb-2">Team Statistics</h1>
          <p className="text-gray-400 mb-4">
            Detailed statistics for each team in the tournament
          </p>
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {filteredTeams.length} results
              </span>
            )}
          </div>
        </div>
        
        {filteredTeams.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No teams found matching "{searchTerm}"
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentTeams.map(({ teamName, stats }) => (
                <TeamCard
                  key={teamName}
                  teamName={teamName}
                  stats={stats}
                />
              ))}
            </div>

            {/* Enhanced Pagination Controls */}
            <div className="flex justify-center items-center space-x-2">
              {/* First Page Button */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                «
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-400">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}

              {/* Last Page Button */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                »
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
} 