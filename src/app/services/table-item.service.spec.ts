import { TestBed } from '@angular/core/testing';

import { TableItemService } from './table-item.service';

describe('TableItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableItemService = TestBed.get(TableItemService);
    expect(service).toBeTruthy();
  });
});
