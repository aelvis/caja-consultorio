import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
	public inicio:boolean;
	public medico;
	public num_boleta;
	public productos;
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
		this._usuarioService.obtenerPedidosConsulturioService().subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].medico){
						this.medico = res["mensaje"].medico;
						this.num_boleta = res["mensaje"].enviar_boleta_num_secuencia;
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
		this._usuarioService.actualizarPedidosConsulturioMedicoService(id,this.num_boleta).subscribe(
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
	abrirProductosCajaPago(id){
		this.inicio = false;
		this._usuarioService.abrirProductosCajaPagoService(id).subscribe(
			res => {
				if(res["mensaje"].terminar){
				  	localStorage.clear();
				  	this._router.navigate(['/login']);
				}else{
					if(res["mensaje"].obtener){
						$("#obtenerModal").modal("show");
						this.productos = res["mensaje"].obtener;
						this.inicio = true;
					}else{
						this.showError("Alerta","No se encuentran Atenciones - volver a Intentar");
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
