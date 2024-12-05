import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-filters2',
  standalone: true,
  imports: [IonicModule,
    ReactiveFormsModule, 
    NgFor, 
  ],
  templateUrl: './filters2.component.html',
  styleUrls: ['./filters2.component.scss'],
})
export class Filters2Component  implements OnInit {

  @Output() filtrosAplicados = new EventEmitter<any>();
  filtrosForm: FormGroup;
  
  departamentos = ['Salto', 'Montevideo', 'Durazno', 'Maldonado', 'Canelones', 'Rocha', 'Colonia', 'Paysandú', 'Artigas', 'Rivera', 'Tacuarembó', 'Lavalleja', 'Treinta y Tres', 'Florida', 'San José', 'Soriano', 'Flores', 'Cerro Largo'];
  habitaciones = ['1', '2', '3', '4', '5+'];


  constructor(private fb: FormBuilder) { 
    this.filtrosForm = this.fb.group({
      habitaciones: [''],
      departamento: ['']
    })
  }

  ngOnInit() {
    this.filtrosForm.valueChanges.subscribe((filtros) => {
      this.filtrosAplicados.emit(filtros);
    });
  }

    // Para que el formulario se resetee
    resetFilters() {
      this.filtrosForm.reset({
        habitaciones: '',
        price: 0,
        departamento: '',
        barrio: ''
      });
  
      this.filtrosAplicados.emit({});
    }
}
