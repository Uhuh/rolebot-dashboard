import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookiesStatic } from 'js-cookie';
import { map, Observable } from 'rxjs';
import { COOKIES } from '../tokens/cookies.token';
import { LOCAL_STORAGE } from '../tokens/localStorage.token';
import { ICategory, IGuildConfig, IReactRole } from '../types/interfaces';

@Injectable()
export class ApiService {
  private readonly apiUrl = 'https://localhost:7013/api';
  private readonly headers: HttpHeaders;

  constructor(
    @Inject(COOKIES) private readonly cookies: CookiesStatic,
    @Inject(LOCAL_STORAGE) private readonly localStorage: Storage,
    private readonly http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.cookies.get('JwtAuthCookie')}`,
    });
  }

  getGuildCategories(guildId: string): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(
      `${this.apiUrl}/Category/GetGuildCategories`,
      {
        headers: this.headers,
        withCredentials: true,
        params: { guildId },
      }
    );
  }

  updateCategory(guildId: string, category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(
      `${this.apiUrl}/Category/Update`,
      { ...category },
      {
        headers: this.headers,
        withCredentials: true,
        params: { guildId },
      }
    );
  }

  getGuildReactRoles(guildId: string): Observable<Array<IReactRole>> {
    return this.http.get<Array<IReactRole>>(
      `${this.apiUrl}/Role/GetGuildRoles`,
      {
        headers: this.headers,
        withCredentials: true,
        params: { guildId },
      }
    );
  }

  getGuildConfig(guildId: string): Observable<IGuildConfig> {
    return this.http.get<IGuildConfig>(`${this.apiUrl}/Guild/Get`, {
      headers: this.headers,
      withCredentials: true,
      params: { guildId },
    });
  }

  updateConfig(
    guildId: string,
    config: IGuildConfig
  ): Observable<IGuildConfig> {
    return this.http.post<IGuildConfig>(
      `${this.apiUrl}/Guild/Update`,
      { ...config },
      {
        headers: this.headers,
        withCredentials: true,
        params: { guildId },
      }
    );
  }

  /**
   * Authorize the user logging in.
   * @param code Discord's code to verify to get the access token.
   * @returns JWT Token or 400 if they're already logged in.
   */
  authorizeUser(code: string): Observable<void> {
    return this.http
      .post(
        `${this.apiUrl}/Auth/Auth`,
        {},
        {
          withCredentials: true,
          params: { code },
          responseType: 'text',
        }
      )
      .pipe(
        map((token: any) => {
          this.localStorage.setItem('jwtToken', token);
        })
      );
  }
}
