// Database service for advocate-related API calls
import { Advocate, AdvocateResponse } from '../data/interfaces';

class AdvocateService {
  private baseUrl = '/api';

  /**
   * Fetch all advocates from the API
   * @returns Promise<Advocate[]>
   */
  async getAdvocates(): Promise<Advocate[]> {
    try {
      const response = await fetch(`${this.baseUrl}/advocates`);

      if (!response.ok) {
        throw new Error(`Failed to fetch advocates: ${response.status}`);
      }

      const jsonResponse: AdvocateResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      console.error('Error fetching advocates:', error);
      throw error;
    }
  }

  /**
   * Search advocates by term
   * @param advocates - Array of advocates to search through
   * @param searchTerm - Term to search for
   * @returns Filtered array of advocates
   */
  searchAdvocates(advocates: Advocate[], searchTerm: string): Advocate[] {
    if (!searchTerm.trim()) {
      return advocates;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowerSearchTerm) ||
        advocate.city.toLowerCase().includes(lowerSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowerSearchTerm) ||
        advocate.specialties.some(specialty =>
          specialty.toLowerCase().includes(lowerSearchTerm)
        ) ||
        advocate.yearsOfExperience.toString().includes(lowerSearchTerm)
      );
    });
  }
}

// Export a singleton instance
export const advocateService = new AdvocateService();
export default advocateService;