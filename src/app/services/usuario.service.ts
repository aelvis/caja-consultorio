import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GLOBAL } from './global';	

@Injectable()
export class UsuarioService{

	public url: string;
	public token;
	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}
	login(user_to_login, gettoken = null){
		if(gettoken != null){
			user_to_login.gettoken = gettoken;
		}
		let params = JSON.stringify(user_to_login);
		let headers = new HttpHeaders({'Content-Type':'application/json'});
		return this._http.post(this.url+'/login/auth/login', params, {headers: headers});
	}
	getToken(){
		let token = localStorage.getItem('token');
		if(token != "undefined"){
			this.token = token;
		}else{
			this.token = null;
		}
		return this.token;
	}
	obtenerPedidosCitasService(){
		let params = new HttpParams();
		params = params.append('nuevo', 'nuevo');
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/tickets/consultorio/obtenerPedidosCitas', params, {headers: headers});
	}
	actualizarPedidosConsulturioService(id){
		let params = new HttpParams();
		params = params.append('codex', id);
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/tickets/consultorio/actualizarPedidosCitas', params, {headers: headers});
	}
	obtenerPedidosConsulturioService(){
		let params = new HttpParams();
		params = params.append('nuevo', 'nuevo');
		let headers = new HttpHeaders({'Content-Type':'application/json','Authorization': this.getToken()});
		return this._http.post(this.url+'/tickets/consultorio/obtenerPedidosConsulturio', params, {headers: headers});
	}
}