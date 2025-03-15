<template>
  <div class="app-container">
    <!-- 搜索框和按钮 -->
    <el-form :inline="true" @submit.native.prevent="fetchData">
      <el-form-item label="CountryCode">
        <el-input
          v-model="listQuery.countryCode"
          placeholder="请输入CountryCode"
          @keyup.enter.native="fetchData"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="CountryCode">
        <template slot-scope="scope">
          <span>{{ scope.row.countryCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="District">
        <template slot-scope="scope">
          {{ scope.row.district }}
        </template>
      </el-table-column>
      <el-table-column label="Population">
        <template slot-scope="scope">
          <span>{{ scope.row.population }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        countryCode: null
      },
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response?.data?.records ?? []
        this.total = response?.data?.total ?? 0
        this.listLoading = false
      })
    }
  }
}
</script>
