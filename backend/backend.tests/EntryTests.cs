using backend.DataAccess.DbPatterns.Interfaces;
using backend.DataAccess.Entity;
using backend.DTO;
using backend.WebNavigator.Services.Service;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.tests
{
	[TestClass]
	public class EntryServiceTests
	{
		private Mock<IGenericRepository<Entry>> _entryRepoMock;
		private Mock<IGenericRepository<Node>> _nodeRepoMock;
		private Mock<IUnitOfWork> _unitOfWorkMock;
		private EntryService _entryService;

		[TestInitialize]
		public void TestInitialize()
		{
			_entryRepoMock = new Mock<IGenericRepository<Entry>>();
			_nodeRepoMock = new Mock<IGenericRepository<Node>>();
			_unitOfWorkMock = new Mock<IUnitOfWork>();

			_unitOfWorkMock.Setup(u => u.Entries).Returns(_entryRepoMock.Object);
			_unitOfWorkMock.Setup(u => u.Nodes).Returns(_nodeRepoMock.Object);

			_entryService = new EntryService(_unitOfWorkMock.Object);
		}

		[TestMethod]
		public async Task GetEntries_ReturnsAllEntries()
		{
			// Arrange
			var entries = new List<Entry> { new Entry(), new Entry() };
			_entryRepoMock.Setup(r => r.GetAll()).ReturnsAsync(entries);

			// Act
			var result = await _entryService.GetEntries();

			// Assert
			Assert.AreEqual(entries.Count, result.Count());
		}

		[TestMethod]
		public async Task RemoveEntry_DeletesEntry()
		{
			// Arrange
			var entryToRemove = new Entry();

			// Act
			var result = await _entryService.RemoveEntry(entryToRemove);

			// Assert
			_entryRepoMock.Verify(r => r.Delete(entryToRemove), Times.Once);
		}

		[TestMethod]
		public async Task GetIdNodeByName_ReturnsNodeId()
		{
			// Arrange
			var nodeName = "ChildNode";
			var parentNodeName = "ParentNode";
			var node = new Node { Id = 1, Name = nodeName, ParentName = parentNodeName };
			_nodeRepoMock.Setup(r => r.Get(n => n.Name == nodeName && n.ParentName == parentNodeName)).ReturnsAsync(node);

			// Act
			var result = await _entryService.GetIdNodeByName(nodeName, parentNodeName);

			// Assert
			Assert.AreEqual(node.Id, result);
		}
	}
}
