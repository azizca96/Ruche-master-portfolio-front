import { MatProviderModule } from './mat-provider.module';

describe('MatProviderModule', () => {
  let matProviderModule: MatProviderModule;

  beforeEach(() => {
    matProviderModule = new MatProviderModule();
  });

  it('should create an instance', () => {
    expect(matProviderModule).toBeTruthy();
  });
});
