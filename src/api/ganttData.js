import moment from 'moment'

const _ganttData = [
  {
    id: '456',
    name: 'Web Server',
    children: [],
    tasks: []
  },
  {
    id: '789',
    name: 'API',
    children: [],
    tasks: []
  },
  {
    id: '123',
    name: 'Server',
    tasks: [
      {
        id: 'abc1',
        name: 'Server',
        from: moment('2016-01-02 13:00:00'),
        to: moment().add(1, 'month')
      }
    ],
    children: ['456', '789']
  },
  {
    id: 'abc',
    name: 'Development',
    tasks: [
      {
        id: 'abc2',
        name: 'Development',
        from: moment('2016-01-02 00:00:00'),
        to: moment('2016-01-02 00:00:00').add(1, 'week')
      }
    ],
    children: ['123']
  },
  {
    id: 'abc44',
    name: 'JavaScript',
    tasks: [
      {
        id: 'abc3',
        name: 'VueJS',
        from: moment('2016-01-01 00:00:00'),
        to: moment('2018-01-01 00:00:00'),
        color: 'rgba(55, 150, 95, 0.34)'
      }
    ],
    children: ['abc']
  },
  {
    id: 'abc33',
    name: 'VueJS',
    tasks: [
      {
        id: 'abc4',
        name: 'WTF',
        from: moment('2016-01-02 00:00:00'),
        to: moment('2016-01-02 00:00:00').add(1, 'week')
      }
    ],
    children: []
  },
  {
    id: 'abasdfasdfasdfasdfasfdasfd22c',
    name: 'Yooooooooooooooo',
    tasks: [
      {
        id: 'abc5',
        name: 'Hello World',
        from: moment('2016-01-02 00:00:00'),
        to: moment('2016-01-02 00:00:00').add(1, 'week')
      }
    ],
    children: []
  },{
    id: 'ab252ccc',
    name: 'Write More Do Less',
    tasks: [
      {
        id: 'abc6',
        name: 'JavaScript',
        from: moment('2016-01-02 00:00:00'),
        to: moment('2016-01-02 00:00:00').add(1, 'month')
      }
    ],
    children: []
  }
]

export default {
  getData (callback) {
    callback(_ganttData)
  },
  addTask (task) {

  }
}