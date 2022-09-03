import axios from 'axios'

const TB_BASE_URL = 'http://120.55.92.168:8080'

export function getDevices(tbtoken) {
  return axios.post(TB_BASE_URL + '/api/entitiesQuery/find',
    {
      entityFilter: {
        type: 'entityName',
        entityType: 'DEVICE',
        entityNameFilter: ''
      },
      entityFields: [
        {
          type: 'ENTITY_FIELD',
          key: 'name'
        },
        {
          type: 'ENTITY_FIELD',
          key: 'label'
        },
        {
          type: 'ENTITY_FIELD',
          'key': 'additionalInfo'
        }
      ],
      latestValues: [
        {
          type: 'ATTRIBUTE',
          key: 'lastActivityTime'
        },
        {
          type: 'ATTRIBUTE',
          key: 'active'
        },
        {
          type: 'ATTRIBUTE',
          key: 'provisionState'
        }
      ],
      pageLink: {
        page: 0,
        pageSize: 100
      },
      direction: 'ASC'
    },
    {
      headers: { Authorization: 'Bearer ' + tbtoken }
    })
}

export function getFanDevs(tbtoken) {
  return axios.post(TB_BASE_URL + '/api/entitiesQuery/find',
    {
      entityFilter: {
        type: 'entityName',
        entityType: 'DEVICE',
        entityNameFilter: 'FAN'
      },
      entityFields: [
        {
          type: 'ENTITY_FIELD',
          key: 'name'
        },
        {
          type: 'ENTITY_FIELD',
          key: 'label'
        },
        {
          type: 'ENTITY_FIELD',
          'key': 'additionalInfo'
        }
      ],
      latestValues: [
        {
          type: 'ATTRIBUTE',
          key: 'lastActivityTime'
        },
        {
          type: 'ATTRIBUTE',
          key: 'active'
        },
        {
          type: 'ATTRIBUTE',
          key: 'provisionState'
        }
      ],
      pageLink: {
        page: 0,
        pageSize: 100
      },
      direction: 'ASC'
    },
    {
      headers: { Authorization: 'Bearer ' + tbtoken }
    })
}

export function getTimeSeries(tbtoken, type, entityId) {
  const url = TB_BASE_URL + '/api/plugins/telemetry/' + type + '/' + entityId + '/keys/timeseries'
  return axios.get(url, {
    headers: { Authorization: 'Bearer ' + tbtoken }
  })
}

export function getLatestTsValue(tbtoken, type, entityId, keys) {
  const url = TB_BASE_URL + '/api/plugins/telemetry/' + type + '/' + entityId + '/values/timeseries?keys=' + keys
  return axios.get(url, {
    headers: { Authorization: 'Bearer ' + tbtoken }
  })
}

export function getTsValuesInterval(tbtoken, type, entityId, keys, start, end) {
  const url = TB_BASE_URL + '/api/plugins/telemetry/' + type + '/' + entityId + '/values/timeseries?keys=' + keys + '&' + 'startTs=' + start + '&' + 'endTs=' + end
  return axios.get(url, {
    headers: { Authorization: 'Bearer ' + tbtoken }
  })
}

export function getDeviceInfo(tbtoken, text = '', profileId = '') {
  const url = TB_BASE_URL + `/api/tenant/deviceInfos?pageSize=10&page=0&sortProperty=createdTime&sortOrder=DESC&deviceProfileId=${profileId}&textSearch=${text}`
  return axios.get(url, { headers: { Authorization: 'Bearer ' + tbtoken }})
}

export function device(tbtoken, id) {
  const url = TB_BASE_URL + `/api/device/${id}`
  return axios.get(url, { headers: { Authorization: 'Bearer ' + tbtoken }})
}

export function refresh(token, refreshToken) {
  const url = TB_BASE_URL + '/api/auth/token'
  return axios.post(url, { refreshToken: refreshToken }, { headers: { Authorization: 'Bearer ' + token }})
}

