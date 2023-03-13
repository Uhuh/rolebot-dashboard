import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookiesStatic } from 'js-cookie';
import { map, Observable } from 'rxjs';
import { COOKIES } from '../tokens/cookies.token';
import { LOCAL_STORAGE } from '../tokens/localStorage.token';
import {
  ICategory,
  IGuild,
  IGuildConfig,
  IReactRole,
} from '../types/interfaces';

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

  options = (params: Record<string, string>) => ({
    headers: this.headers,
    withCredentials: true,
    params,
  });

  getGuildCategories(guildId: string): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(
      `${this.apiUrl}/Category/GetGuildCategories`,
      this.options({ guildId })
    );
  }

  updateCategory(guildId: string, category: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(
      `${this.apiUrl}/Category/Update`,
      { ...category },
      this.options({ guildId })
    );
  }

  createCategory(guildId: string, category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(
      `${this.apiUrl}/Category/Create`,
      { ...category },
      this.options({ guildId })
    );
  }

  deleteCategory(guildId: string, categoryId: string): Observable<ICategory> {
    return this.http.delete<ICategory>(
      `${this.apiUrl}/Category/Delete`,
      this.options({ guildId, categoryId })
    );
  }

  getGuildReactRoles(guildId: string): Observable<Array<IReactRole>> {
    return this.http.get<Array<IReactRole>>(
      `${this.apiUrl}/Role/GetGuildRoles`,
      this.options({ guildId })
    );
  }

  getGuildConfig(guildId: string): Observable<IGuildConfig> {
    return this.http.get<IGuildConfig>(
      `${this.apiUrl}/Guild/Get`,
      this.options({ guildId })
    );
  }

  getGuildInfo(guildId: string = ''): Observable<IGuild> {
    return this.http.get<IGuild>(
      `${this.apiUrl}/Guild/GetGuildInfo`,
      this.options({ guildId })
    );
  }

  updateConfig(
    guildId: string,
    config: IGuildConfig
  ): Observable<IGuildConfig> {
    return this.http.post<IGuildConfig>(
      `${this.apiUrl}/Guild/Update`,
      { ...config },
      this.options({ guildId })
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
