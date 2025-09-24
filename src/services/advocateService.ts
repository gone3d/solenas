// Database service for advocate-related API calls
import { Advocate, AdvocateResponse } from "../data";

class AdvocateService {
  private baseUrl = "/api";

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
      console.error("Error fetching advocates:", error);
      throw error;
    }
  }

  /**
   * Search advocates by term using a searchable text approach
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
      // Create a searchable text string from all relevant fields
      const searchableText = this.createSearchableText(advocate).toLowerCase();
      return searchableText.includes(lowerSearchTerm);
    });
  }

  /**
   * Creates a searchable text string from advocate data
   * Similar to a search_vector in SQL databases
   * @param advocate - The advocate object
   * @returns Concatenated searchable string
   */
  private createSearchableText(advocate: Advocate): string {
    const searchableFields = [
      advocate.firstName,
      advocate.lastName,
      advocate.city,
      advocate.degree,
      advocate.specialties.join(" "),
      advocate.yearsOfExperience.toString(),
      advocate.phoneNumber.toString(),
    ];

    return searchableFields.join(" ").toLowerCase();
  }
}

// Export a singleton instance
export const advocateService = new AdvocateService();
export default advocateService;
