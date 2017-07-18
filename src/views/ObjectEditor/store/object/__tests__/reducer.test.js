import reducer, {
  addPlaneGeometry,
  addRectangularCollisionZone,
} from '../reducer';

describe('on initialization', () => {
  let state;

  beforeEach(() => {
    state = reducer();
  });

  it('contains <object/> node', () => {
    expect(state.node[0].outerHTML).toEqual('<object></object>');
  });

  describe('#addPlaneGeometry()', () => {
    beforeEach(() => {
      state = reducer(state, addPlaneGeometry(32, 16, 2, 4));
    });

    it('adds a <geometry> node', () => {
      expect(state.node.find('geometry')[0].outerHTML)
      .toEqual('<geometry type="plane" w="32" h="16" x-segments="2" y-segments="4"></geometry>');
    });
  });

  describe('#addRectangularCollisionZone()', () => {
    beforeEach(() => {
      state = reducer(state, addRectangularCollisionZone(13, 15, 4, 12));
    });

    it('adds a <collision> node', () => {
      expect(state.node.find('collision').length).toEqual(1);
    });

    it('adds a <rect> node inside collision node', () => {
      expect(state.node.find('collision > rect')[0].outerHTML)
      .toEqual('<rect w="13" h="15" offset-x="4" offset-y="12"></rect>');
    });
  });
});
