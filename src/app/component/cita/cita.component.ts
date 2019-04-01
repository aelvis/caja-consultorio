import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {
	public inicio:boolean;
	public cita:boolean;
  	constructor(private toastr: ToastrService, private _usuarioService: UsuarioService, private _router: Router) { }

	ngOnInit(){
		this.obtenerProducto();
	}
	showSuccess(titulo,mensaje) {
    	this.toastr.success(mensaje, titulo);
  	}
  	showError(titulo,mensaje) {
    	this.toastr.error(mensaje, titulo);
  	}
	obtenerProducto(){
		this.inicio = false;
		this._usuarioService.obtenerPedidosCitasService().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].cita){
						this.cita = res["mensaje"].cita;
						this.inicio = true;
					}else{
						this.showError("Alerta","No se encuentran Atenciones");
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
	finalizarCambiarEstadoController(id){
		this.inicio = false;
		this._usuarioService.actualizarPedidosConsulturioService(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].codigo == 'success'){
						this.showSuccess("Alerta","Actualizado exitosamente");
						this.obtenerProducto();
					}else{
						this.showError("Alerta","No se encuentran Atenciones");
						this.inicio = true;
					}
				}
			},
			error => {
				this.showError("Alerta","Error de Internet");
				this.inicio = true;
			}
		);
	}
}
