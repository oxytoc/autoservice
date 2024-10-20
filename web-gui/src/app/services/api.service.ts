import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { User, LoginInterface, Order, Part, PredictParts, OrderStatus } from '../interfaces';

interface ServerPartQuantity {
  id: number;
  quantity: number;
  part: Part;
}

interface ServerOrder {
  id: number;
  orderDate: string;
  client: User;
  orderStatus: OrderStatus;
  partQuantities: ServerPartQuantity[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'http://localhost:3000/api';

  getParts(params?: Record<string, any>): Observable<Part[]> {
    const path = this.baseUrl + '/parts';
    console.log(params);
    return this.http.get<any>(path , { params });
  }

  createPart(part: Part): Observable<any> {
    const path = this.baseUrl + '/parts';
    return this.http.post<any>(path, part);
  }

  deleteParts(parts: Part[]): Observable<any> {
    const path = this.baseUrl + '/parts/delete';
    const partIds = parts.map(part => part.id)
    return this.http.post<any>(path, partIds);
  }

  getUsers(): Observable<User[]> {
    const path = this.baseUrl + '/users';
    return this.http.get<any>(path);
  }

  createUser(user: User): Observable<any> {
    const path = this.baseUrl + '/users/create';
    return this.http.post<any>(path, user);
  }

  deleteUsers(clients: User[]): Observable<any> {
    const path = this.baseUrl + '/users/delete';
    const partIds = clients.map(client => client.id)
    return this.http.post<any>(path, partIds);
  }

  getOrders(): Observable<Order[]> {
    const path = this.baseUrl + '/orders';
    return this.http.get<ServerOrder[]>(path).pipe(
      map(serverOrders => {
        return serverOrders.map(
          so => ({
            ...so,
            orderDate: new Date(so.orderDate).toUTCString(),
            clientId: so.client.id,
            partQuantities: so.partQuantities.map(q => ({quantity: q.quantity, partId: q.part.id}))
          })
        )
      })
    );
  }

  createPopularParts(timeFrom: Date, timeTill: Date): Observable<any>{
    const times = {
      dateFrom: timeFrom.toISOString(),
      dateTill: timeTill.toISOString()
    }
    const path = this.baseUrl + '/popularParts';
    return this.http.post<PredictParts>(path, times);
  }

  getPopularParts(): Observable<PredictParts[]>{
    const path = this.baseUrl + '/popularParts';
    return this.http.get<PredictParts[]>(path);
  }

  createOrder(order: Order): Observable<any> {
    const path = this.baseUrl + '/orders';
    return this.http.post<any>(path, order);
  }

  deleteOrders(orders: Order[]): Observable<any> {
    const path = this.baseUrl + '/orders/delete';
    const partIds = orders.map(order => order.id)
    return this.http.post<any>(path, partIds);
  }
}
