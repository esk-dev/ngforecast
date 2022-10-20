import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({ providedIn: 'root' })
export class IconService {
  constructor(public iconRegistry: MatIconRegistry, public sanitizer: DomSanitizer) {}

  public registerIcon(path: string, name: string): string {
    this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(path));
    return name;
  }
}
