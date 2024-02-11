using backend.DTOs;
using backend.Models;
using backend.Services.Implementations;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("navigator")]
    public class NavigatorController : Controller
    {
        private readonly NodeService _nodeService;
        private readonly EntryService _entryService;

        public NavigatorController(NodeService nodeService, EntryService entryService)
        {
            _nodeService = nodeService;
            _entryService = entryService;
        }

        //Get: navigator/nodes
        [HttpGet]
        [Route("nodes")]
        public IActionResult Index()
        {
            var nodes = _nodeService.GetNodes();
            return Json(nodes);
        }

        //Post: navigator/createNode
        [HttpPost]
        [Route("createNode")]
        public IActionResult CreateNode([FromBody] NodeDTO newNode)
        {
            if (ModelState.IsValid)
            {
                var node = new Node()
                {
                    Name = newNode.Name,
                    ParentName = newNode.ParentName,
                    Type = newNode.Type
                };

                if (_nodeService.AddNode(node))
                {
                    return Ok();
                }
            }

            return BadRequest();
        }

        //Delete: navigator/deleteNode
        [HttpDelete]
        [Route("deleteNode")]
        public IActionResult DeleteNode([FromBody] NodeDTO nodeToDelete)
        {
            if (ModelState.IsValid)
            {
                var node = new Node()
                {
                    Name = nodeToDelete.Name,
                    ParentName = nodeToDelete.ParentName,
                    Type = nodeToDelete.Type
                };

                if(_nodeService.RemoveNode(node))
                {
                    return Ok();
                }
            }
            return BadRequest();
        }

        //Post: navigator/createEntry
        [HttpPost]
        [Route("createEntry")]
        public IActionResult CreateEntry([FromBody] EntryDTO newEntry)
        {
            if (ModelState.IsValid)
            {
                var result = _entryService.AddEntry(newEntry);
                if (result != -1)
                {
                    return Json(result);
                }
            }
            return BadRequest();
        }
    }
}
