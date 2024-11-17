import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, map, Observable, switchMap, tap } from 'rxjs';
import { Part } from 'src/parts-manager/entity/part.entity';
import { PartsManagerService } from 'src/parts-manager/parts-manager.service';


@Injectable()
export class PersonalOffersService {
  constructor(
    private httpService: HttpService,
    private partService: PartsManagerService
  ) { }

  getRecommendations(itemNames: string[]): Observable<Part[]> {
    const url = `${process.env.ML_SERVICE_URL}/recommend-offers`;

    return this.httpService.post<{ recommendations: Part[] }>(url, { item_names: itemNames }).pipe(
      tap((forecastResponse) => console.log(forecastResponse)),
      switchMap(recomParts => this.partService.findParts(recomParts.data.recommendations.map(part => part.id))),
      catchError((error) => {
        throw new Error(`Failed to get recommendations: ${error}`);
      })
    )
  }

  retrain(): Observable<string> {
    const url = `${process.env.ML_SERVICE_URL}/retrain`;

    return this.httpService.post(url, { }).pipe(
      map(retrainAns => retrainAns.data),
      catchError((error) => {
        throw new Error(`Failed to retrain: ${error}`);
      })
    )
  }
}