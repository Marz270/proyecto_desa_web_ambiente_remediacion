import { Component, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../interfaces/property';
import { AuthService } from '../../services/auth.service';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { PropertyCardComponent } from '../../components/property-card/property-card.component';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FiltersComponent } from "../../components/filters/filters.component";

@Component({
  selector: 'app-publicaciones2',
  templateUrl: './publicaciones2.page.html',
  standalone: true,
  imports: [PropertyCardComponent, NgFor, IonicModule, FiltersComponent],
})
export class Publicaciones2Page implements OnInit {
  private authService = inject(AuthService);
  private propertyService = inject(PropertyService);

  defaultProperties!: WritableSignal<Property[]>;
  properties!: Property[];

  constructor() {}

  async ngOnInit(): Promise<void> {
    const userCity = this.authService.getCity();
    console.log(userCity);
    await this.propertyService.fetchProperties();
    this.propertyService.getPropertiesByCity(userCity)
    this.defaultProperties = this.propertyService.getcityProperties();
    this.properties = this.defaultProperties();
    console.log(this.properties);
  }

  aplicarFiltros(filtros: any): void {
    // no tiene filtros aplicados, restaura todas las propiedades
    if (!filtros || Object.keys(filtros).every((key) => !filtros[key])) {
      this.properties = [...this.defaultProperties()];
      return;
    }
    this.properties = this.defaultProperties().filter((property) => {

      // Filtro de Habitaciones
      const cumpleHabitaciones = 
        !filtros.habitaciones ||
        (filtros.habitaciones === '5+' && property.number_of_rooms >= 5) ||
        (filtros.habitaciones !== '5+' &&
          property.number_of_rooms === +filtros.habitaciones);

      

      // Filtro de Departamento
      const cumpleDepartamento =
        !filtros.departamento || property.departamento === filtros.departamento;
      ;

      // incluye la propiedad si cumple con todas las condiciones de filtro
      return (
        cumpleHabitaciones ||
        cumpleDepartamento
      );
    });
  }
}
