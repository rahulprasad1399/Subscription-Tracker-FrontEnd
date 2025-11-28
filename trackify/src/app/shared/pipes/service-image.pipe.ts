import { Pipe, PipeTransform } from '@angular/core';
import { SERVICE_DOMAINS } from '../constants/service-domains';
// Make sure this path points to where you saved the previous file

@Pipe({
  name: 'serviceImage',
  standalone: true
})
export class ServiceImagePipe implements PipeTransform {

  transform(serviceId: number): string {
    // 1. Find the service in the constant list
    const service = SERVICE_DOMAINS.find(s => s.id === serviceId);

    // 2. If found, return the constructed URL
    if (service && service.domain) {
      // Switched to Google S2 Favicons
      // Benefit: It returns a default "Globe" icon if the specific logo isn't found, 
      // preventing 404 broken image errors in your table.
      return `https://www.google.com/s2/favicons?domain=${service.domain}&sz=128`;
    }

    // 3. Fallback if ID is invalid or not found
    // Using a generic public placeholder so it works even without local assets
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM2YjcyODAiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjIiIHk9IjciIHdpZHRoPSIyMCIgaGVpZ2h0PSIxNCIgcng9IjIiIHJ5PSIyIj48L3JlY3Q+PHBhdGggZD0iTTE2IDIxVjVhMiAyIDAgMCAwLTItMmgtNGEyIDIgMCAwIDAtMiAydjE2Ij48L3BhdGg+PC9zdmc+'; 
  }

}