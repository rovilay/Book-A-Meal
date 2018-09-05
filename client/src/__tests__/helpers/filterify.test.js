import filterify from '../../helpers/filterify';
import { menus } from '../__mockData__/menuMock';


describe('filterify helper', () => {
  it('should return all element if `filterBy` is `all`', (done) => {
    const filteredMenus = filterify(menus, { by: 'all', date: '', month: ''});
    expect(filteredMenus).toEqual(menus);

    done();
  });


  it('should return all element if `filterBy` is `date`', (done) => {
    const filteredMenus = filterify(menus, { by: 'date', date: '2018-08-24', month: ''});
    expect(filteredMenus.length).toEqual(1);
    expect(filteredMenus[0]).toEqual(menus[1])

    done();
  });

  it('should return all element if `filterBy` is `month`', (done) => {
    const menusWithCreatedAt = [
      {
        ...menus[0],
        createdAt: '2018-09-03'
      },
      {
        ...menus[0],
        createdAt: '2018-09-02'
      }
    ]
    const filteredMenus = filterify(menusWithCreatedAt, { by: 'month', date: '', month: 'September'});
    expect(filteredMenus.length).toEqual(2);
    expect(filteredMenus[0]).toEqual(menusWithCreatedAt[0])

    done();
  });
})
